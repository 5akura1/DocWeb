---
title: TAP加IDM
createTime: 2025/05/18 10:22:53
permalink: /voron24/3dvf11ul/
---
## TAP + IDM

最新教程 [Sgr A* VMT/IDM documents](https://gitee.com/NBTP/idm-documents)

***重要：教程里没有提到的不要做（尤其是G28）提到的请务必做，使用本模块需要对klipper使用有一定知识和经验积累，请在使用前确保你具备自己进行配置修改的能力***

***软件： 开始前请确保你是用的是python3.6以上的klipper***

***硬件：为了保证精度，请安装时尽可能让传感器线圈板的顶面低于加热块的底面。***



### 安装脚本

1.在用户目录下执行下方git命令来下载配套脚本

```
git clone https://gitee.com/NBTP/IDM.git 
```

2.如果你不确定自己的pip源是否是国内源或者能否正常下载新的库，或者你完全不知道pip是什么,建议使用以下命令将pip设置为清华源:

```
~/klippy-env/bin/pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

3.然后执行下方命令进行安装

```
IDM/install.sh
```

### 配置CFG

1.复制到**Printer.cfg**

```
#####################################################################
#      TAP + IDM
#####################################################################
[mcu idm]
# serial:
canbus_uuid: XXX
# Path to the serial port for the idm device. Typically has the form
# USB ls /dev/serial/by-id/*
# CAN ~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q

[scanner]
mcu:idm
# mcu of IDM
speed: 20.
#   Z probing dive speed.
lift_speed: 5.
#   Z probing lift speed.
backlash_comp: 0.5
#   Backlash compensation distance for removing Z backlash before measuring
#   the sensor response.
x_offset: 0.
#   X offset of idm from the nozzle.
y_offset: 20.0
#   Y offset of idm from the nozzle.
trigger_distance: 2.
#   idm trigger distance for homing.
trigger_dive_threshold: 1.5
#   Threshold for range vs dive mode probing. Beyond `trigger_distance +
#   trigger_dive_threshold` a dive will be used.
trigger_hysteresis: 0.006
#   Hysteresis on trigger threshold for untriggering, as a percentage of the
#   trigger threshold.
cal_nozzle_z: 0.1
#   Expected nozzle offset after completing manual Z offset calibration.
cal_floor: 0.1
#   Minimum z bound on sensor response measurement.
cal_ceil:5.
#   Maximum z bound on sensor response measurement.
cal_speed: 1.0
#   Speed while measuring response curve.
cal_move_speed: 10.
#   Speed while moving to position for response curve measurement.
default_model_name: default
#   Name of default idm model to load.
mesh_main_direction: x
#   Primary travel direction during mesh measurement.
#mesh_overscan: -1
#   Distance to use for direction changes at mesh line ends. Omit this setting
#   and a default will be calculated from line spacing and available travel.
mesh_cluster_size: 1
#   Radius of mesh grid point clusters.
mesh_runs: 1
#   Number of passes to make during mesh scan.

# calibration_method: touch
# #    校准方法的设置，如果你不想使用touch可以设置为scan来直接兼容旧版本的命令ng. 
sensor: idm
#   传感器名称，idm/cartographer

scanner_touch_max_temp: 150
#    戳床时喷嘴下降到该温度

calibration_method: second_probe
z_offset: 0.810 #触发高度相对于喷嘴的偏移,tap的话请自行测量（先测idm偏移，后测触发偏移-0.81取正）
probe_speed: 10                  #校准时z移动速度
probe_pin: !SB2040:gpio22       #tap使用的限位引脚配置

[gcode_macro QUAD_GANTRY_LEVEL]
rename_existing: _QUAD_GANTRY_LEVEL
gcode:
    SAVE_GCODE_STATE NAME=STATE_QGL
    BED_MESH_CLEAR
    {% if not printer.quad_gantry_level.applied %}
      _QUAD_GANTRY_LEVEL horizontal_move_z=10 retry_tolerance=1
    {% endif %}
    _QUAD_GANTRY_LEVEL horizontal_move_z=2
    RESTORE_GCODE_STATE NAME=STATE_QGL

[gcode_macro BED_MESH_CALIBRATE]
rename_existing: _BED_MESH_CALIBRATE
gcode:
    {% set TARGET_TEMP = printer.heater_bed.target %}
    M140 S0
    _BED_MESH_CALIBRATE {rawparams}
    M140 S{TARGET_TEMP}
    
[force_move]
enable_force_move: true
```

2.限位修改

**[probe]模块代码全部删除，如果你是用过klicky，请记得移除它的相关脚本的引用**
将z限位`(stepper_z中的endstop_pin:xx)`后面的参数修改为`probe:z_virtual_endstop`
还需要设置

```
[safe_z_home]
home_xy_position: <你的x轴中心坐标>,<你的y轴中心坐标>
z_hop: 10
```

> 如果你已经配置过safe_z_home或者homing_override，可以忽视这一步

3.网床和调平设置

**记得设置[bed_mesh] [QUAD_GANTRY_LEVEL]中距离是IDM中心的位置（不是喷嘴的位置），原来的点超范围会报错**

### IDM校准

1.重启之后归零x和y（`G28 x y` ,不要归零z），并将打印头移动到热床正中央
2.然后输入`SET_KINEMATIC_POSITION z=80`之后就可以控制z方向移动，将喷嘴贴到平台上（也可以垫A4纸确保间隙合适`0.2`）
3.再输入`SET_KINEMATIC_POSITION z=0`（注意，这和之前那条不一样）

4.之后执行指令`idm_calibrate`，弹出的偏移控制框，请点击`-0.1`的偏移后确认，会自动进行校准

> *如果校准后重启之后，无法归零，报错no model，那么你的配置文件的自动生成配置格式错误，请修正格式。*

### TAP偏移

1.首先归零 X Y Z `G28`

2.测量TAP偏移 `idm_touch calibrate=1`测定固定z偏移（z_offset）后放弃测量，得到z偏移值（z_offset）填入

```
[scanner]
z_offset: 0.810 #触发高度相对于喷嘴的偏移,tap的话请自行测量（先测idm偏移，后测触发偏移-0.81取正）
```

> 由于TAP进行自动z偏移的过程中会产生挤压导致喷嘴位置为负，需要使用`idm_touch calibrate=1`自行测定固定z偏移（z_offset）后放弃测量

> 计算时：Z偏移 = TAP探测值  -  TAP偏移(z_offset)
>
> TAP探测值 包含 TAP偏移（z_offset）+Z偏移
>
> 例 -0.83 - -0.81=-0.02

对z偏移进行校准请使用`probe_calibrate method=auto`

### 开始打印gcode

在热床加热结束后加入，保证热偏移也被添加（不加就刮板）

```
PROBE_CALIBRATE METHOD=AUTO  
```
