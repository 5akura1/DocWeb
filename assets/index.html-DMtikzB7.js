import{_ as n,c as a,b as e,o as i}from"./app-DKdWVW_t.js";const l={};function p(d,s){return i(),a("div",null,s[0]||(s[0]=[e(`<h2 id="tap-idm" tabindex="-1"><a class="header-anchor" href="#tap-idm"><span>TAP + IDM</span></a></h2><p>最新教程 <a href="https://gitee.com/NBTP/idm-documents" target="_blank" rel="noopener noreferrer">Sgr A* VMT/IDM documents</a></p><p><em><strong>重要：教程里没有提到的不要做（尤其是G28）提到的请务必做，使用本模块需要对klipper使用有一定知识和经验积累，请在使用前确保你具备自己进行配置修改的能力</strong></em></p><p><em><strong>软件： 开始前请确保你是用的是python3.6以上的klipper</strong></em></p><p><em><strong>硬件：为了保证精度，请安装时尽可能让传感器线圈板的顶面低于加热块的底面。</strong></em></p><h3 id="安装脚本" tabindex="-1"><a class="header-anchor" href="#安装脚本"><span>安装脚本</span></a></h3><p>1.在用户目录下执行下方git命令来下载配套脚本</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>git clone https://gitee.com/NBTP/IDM.git</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.如果你不确定自己的pip源是否是国内源或者能否正常下载新的库，或者你完全不知道pip是什么,建议使用以下命令将pip设置为清华源:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>~/klippy-env/bin/pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>3.然后执行下方命令进行安装</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>IDM/install.sh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h3 id="配置cfg" tabindex="-1"><a class="header-anchor" href="#配置cfg"><span>配置CFG</span></a></h3><p>1.复制到<strong>Printer.cfg</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>#####################################################################</span></span>
<span class="line"><span>#      TAP + IDM</span></span>
<span class="line"><span>#####################################################################</span></span>
<span class="line"><span>[mcu idm]</span></span>
<span class="line"><span># serial:</span></span>
<span class="line"><span>canbus_uuid: XXX</span></span>
<span class="line"><span># Path to the serial port for the idm device. Typically has the form</span></span>
<span class="line"><span># USB ls /dev/serial/by-id/*</span></span>
<span class="line"><span># CAN ~/klippy-env/bin/python ~/klipper/lib/canboot/flash_can.py -q</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[scanner]</span></span>
<span class="line"><span>mcu:idm</span></span>
<span class="line"><span># mcu of IDM</span></span>
<span class="line"><span>speed: 20.</span></span>
<span class="line"><span>#   Z probing dive speed.</span></span>
<span class="line"><span>lift_speed: 5.</span></span>
<span class="line"><span>#   Z probing lift speed.</span></span>
<span class="line"><span>backlash_comp: 0.5</span></span>
<span class="line"><span>#   Backlash compensation distance for removing Z backlash before measuring</span></span>
<span class="line"><span>#   the sensor response.</span></span>
<span class="line"><span>x_offset: 0.</span></span>
<span class="line"><span>#   X offset of idm from the nozzle.</span></span>
<span class="line"><span>y_offset: 20.0</span></span>
<span class="line"><span>#   Y offset of idm from the nozzle.</span></span>
<span class="line"><span>trigger_distance: 2.</span></span>
<span class="line"><span>#   idm trigger distance for homing.</span></span>
<span class="line"><span>trigger_dive_threshold: 1.5</span></span>
<span class="line"><span>#   Threshold for range vs dive mode probing. Beyond \`trigger_distance +</span></span>
<span class="line"><span>#   trigger_dive_threshold\` a dive will be used.</span></span>
<span class="line"><span>trigger_hysteresis: 0.006</span></span>
<span class="line"><span>#   Hysteresis on trigger threshold for untriggering, as a percentage of the</span></span>
<span class="line"><span>#   trigger threshold.</span></span>
<span class="line"><span>cal_nozzle_z: 0.1</span></span>
<span class="line"><span>#   Expected nozzle offset after completing manual Z offset calibration.</span></span>
<span class="line"><span>cal_floor: 0.1</span></span>
<span class="line"><span>#   Minimum z bound on sensor response measurement.</span></span>
<span class="line"><span>cal_ceil:5.</span></span>
<span class="line"><span>#   Maximum z bound on sensor response measurement.</span></span>
<span class="line"><span>cal_speed: 1.0</span></span>
<span class="line"><span>#   Speed while measuring response curve.</span></span>
<span class="line"><span>cal_move_speed: 10.</span></span>
<span class="line"><span>#   Speed while moving to position for response curve measurement.</span></span>
<span class="line"><span>default_model_name: default</span></span>
<span class="line"><span>#   Name of default idm model to load.</span></span>
<span class="line"><span>mesh_main_direction: x</span></span>
<span class="line"><span>#   Primary travel direction during mesh measurement.</span></span>
<span class="line"><span>#mesh_overscan: -1</span></span>
<span class="line"><span>#   Distance to use for direction changes at mesh line ends. Omit this setting</span></span>
<span class="line"><span>#   and a default will be calculated from line spacing and available travel.</span></span>
<span class="line"><span>mesh_cluster_size: 1</span></span>
<span class="line"><span>#   Radius of mesh grid point clusters.</span></span>
<span class="line"><span>mesh_runs: 1</span></span>
<span class="line"><span>#   Number of passes to make during mesh scan.</span></span>
<span class="line"><span></span></span>
<span class="line"><span># calibration_method: touch</span></span>
<span class="line"><span># #    校准方法的设置，如果你不想使用touch可以设置为scan来直接兼容旧版本的命令ng. </span></span>
<span class="line"><span>sensor: idm</span></span>
<span class="line"><span>#   传感器名称，idm/cartographer</span></span>
<span class="line"><span></span></span>
<span class="line"><span>scanner_touch_max_temp: 150</span></span>
<span class="line"><span>#    戳床时喷嘴下降到该温度</span></span>
<span class="line"><span></span></span>
<span class="line"><span>calibration_method: second_probe</span></span>
<span class="line"><span>z_offset: 0.810 #触发高度相对于喷嘴的偏移,tap的话请自行测量（先测idm偏移，后测触发偏移-0.81取正）</span></span>
<span class="line"><span>probe_speed: 10                  #校准时z移动速度</span></span>
<span class="line"><span>probe_pin: !SB2040:gpio22       #tap使用的限位引脚配置</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[gcode_macro QUAD_GANTRY_LEVEL]</span></span>
<span class="line"><span>rename_existing: _QUAD_GANTRY_LEVEL</span></span>
<span class="line"><span>gcode:</span></span>
<span class="line"><span>    SAVE_GCODE_STATE NAME=STATE_QGL</span></span>
<span class="line"><span>    BED_MESH_CLEAR</span></span>
<span class="line"><span>    {% if not printer.quad_gantry_level.applied %}</span></span>
<span class="line"><span>      _QUAD_GANTRY_LEVEL horizontal_move_z=10 retry_tolerance=1</span></span>
<span class="line"><span>    {% endif %}</span></span>
<span class="line"><span>    _QUAD_GANTRY_LEVEL horizontal_move_z=2</span></span>
<span class="line"><span>    RESTORE_GCODE_STATE NAME=STATE_QGL</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[gcode_macro BED_MESH_CALIBRATE]</span></span>
<span class="line"><span>rename_existing: _BED_MESH_CALIBRATE</span></span>
<span class="line"><span>gcode:</span></span>
<span class="line"><span>    {% set TARGET_TEMP = printer.heater_bed.target %}</span></span>
<span class="line"><span>    M140 S0</span></span>
<span class="line"><span>    _BED_MESH_CALIBRATE {rawparams}</span></span>
<span class="line"><span>    M140 S{TARGET_TEMP}</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>[force_move]</span></span>
<span class="line"><span>enable_force_move: true</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.限位修改</p><p><strong>[probe]模块代码全部删除，如果你是用过klicky，请记得移除它的相关脚本的引用</strong> 将z限位<code>(stepper_z中的endstop_pin:xx)</code>后面的参数修改为<code>probe:z_virtual_endstop</code> 还需要设置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[safe_z_home]</span></span>
<span class="line"><span>home_xy_position: &lt;你的x轴中心坐标&gt;,&lt;你的y轴中心坐标&gt;</span></span>
<span class="line"><span>z_hop: 10</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>如果你已经配置过safe_z_home或者homing_override，可以忽视这一步</p></blockquote><p>3.网床和调平设置</p><p><strong>记得设置[bed_mesh] [QUAD_GANTRY_LEVEL]中距离是IDM中心的位置（不是喷嘴的位置），原来的点超范围会报错</strong></p><h3 id="idm校准" tabindex="-1"><a class="header-anchor" href="#idm校准"><span>IDM校准</span></a></h3><p>1.重启之后归零x和y（<code>G28 x y</code> ,不要归零z），并将打印头移动到热床正中央 2.然后输入<code>SET_KINEMATIC_POSITION z=80</code>之后就可以控制z方向移动，将喷嘴贴到平台上（也可以垫A4纸确保间隙合适<code>0.2</code>） 3.再输入<code>SET_KINEMATIC_POSITION z=0</code>（注意，这和之前那条不一样）</p><p>4.之后执行指令<code>idm_calibrate</code>，弹出的偏移控制框，请点击<code>-0.1</code>的偏移后确认，会自动进行校准</p><blockquote><p><em>如果校准后重启之后，无法归零，报错no model，那么你的配置文件的自动生成配置格式错误，请修正格式。</em></p></blockquote><h3 id="tap偏移" tabindex="-1"><a class="header-anchor" href="#tap偏移"><span>TAP偏移</span></a></h3><p>1.首先归零 X Y Z <code>G28</code></p><p>2.测量TAP偏移 <code>idm_touch calibrate=1</code>测定固定z偏移（z_offset）后放弃测量，得到z偏移值（z_offset）填入</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>[scanner]</span></span>
<span class="line"><span>z_offset: 0.810 #触发高度相对于喷嘴的偏移,tap的话请自行测量（先测idm偏移，后测触发偏移-0.81取正）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>由于TAP进行自动z偏移的过程中会产生挤压导致喷嘴位置为负，需要使用<code>idm_touch calibrate=1</code>自行测定固定z偏移（z_offset）后放弃测量</p></blockquote><blockquote><p>计算时：Z偏移 = TAP探测值 - TAP偏移(z_offset)</p><p>TAP探测值 包含 TAP偏移（z_offset）+Z偏移</p><p>例 -0.83 - -0.81=-0.02</p></blockquote><p>对z偏移进行校准请使用<code>probe_calibrate method=auto</code></p><h3 id="开始打印gcode" tabindex="-1"><a class="header-anchor" href="#开始打印gcode"><span>开始打印gcode</span></a></h3><p>在热床加热结束后加入，保证热偏移也被添加（不加就刮板）</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#393a34;--shiki-dark:#dbd7caee;--shiki-light-bg:#ffffff;--shiki-dark-bg:#121212;"><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>PROBE_CALIBRATE METHOD=AUTO</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div>`,35)]))}const r=n(l,[["render",p]]),t=JSON.parse('{"path":"/voron24/3dvf11ul/","title":"TAP加IDM","lang":"zh-CN","frontmatter":{"title":"TAP加IDM","createTime":"2025/05/18 10:22:53","permalink":"/voron24/3dvf11ul/"},"readingTime":{"minutes":3.85,"words":1155},"git":{"updatedTime":1747536922000,"contributors":[{"name":"Sakura1","username":"Sakura1","email":"im5akura1.w@gmail.com","commits":2,"avatar":"https://avatars.githubusercontent.com/Sakura1?v=4","url":"https://github.com/Sakura1"}]},"filePathRelative":"notes/voron24/mods/TAP加IDM.md","headers":[]}');export{r as comp,t as data};
