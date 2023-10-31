import{_ as l,r as t,o as c,c as p,a as n,b as s,d as e,e as i}from"./app-bc4934cb.js";const r={},o=i(`<h2 id="一、环境准备" tabindex="-1"><a class="header-anchor" href="#一、环境准备" aria-hidden="true">#</a> 一、环境准备</h2><h3 id="_1-1-购买一个云服务器-例如阿里云、腾讯云等等-操作系统为linux-centos7-x" tabindex="-1"><a class="header-anchor" href="#_1-1-购买一个云服务器-例如阿里云、腾讯云等等-操作系统为linux-centos7-x" aria-hidden="true">#</a> 1.1. 购买一个云服务器，例如阿里云、腾讯云等等，操作系统为Linux centos7.x</h3><h3 id="_1-2-远程连接工具xshell或finalshell" tabindex="-1"><a class="header-anchor" href="#_1-2-远程连接工具xshell或finalshell" aria-hidden="true">#</a> 1.2.远程连接工具xshell或finalshell</h3><h3 id="_1-3-在服务器上安装jdk1-8" tabindex="-1"><a class="header-anchor" href="#_1-3-在服务器上安装jdk1-8" aria-hidden="true">#</a> 1.3. 在服务器上安装Jdk1.8+</h3><h4 id="_1-3-1-yum安装-openjdk11" tabindex="-1"><a class="header-anchor" href="#_1-3-1-yum安装-openjdk11" aria-hidden="true">#</a> 1.3.1.yum安装 openjdk11</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>yum <span class="token function">install</span> <span class="token parameter variable">-y</span> java-11-openjdk
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装位置默认为<code>/usr/lib/jvm/</code>，修改目录名</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">mv</span> <span class="token parameter variable">-v</span> java-11-openjdk-11.0.12.0.7-0.el8_4.x86_64 jdk11
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-3-2-配置环境变量" tabindex="-1"><a class="header-anchor" href="#_1-3-2-配置环境变量" aria-hidden="true">#</a> 1.3.2.配置环境变量</h4><p>修改配置文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vim</span> /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>将光标移动到最后，在后面添加</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">JAVA_HOME</span><span class="token operator">=</span>/usr/lib/jvm/jdk11
<span class="token builtin class-name">export</span> <span class="token assign-left variable">JRE_HOME</span><span class="token operator">=</span><span class="token variable">\${JAVA_HOME}</span>/jre
<span class="token builtin class-name">export</span> <span class="token assign-left variable">CLASSPATH</span><span class="token operator">=</span>.:<span class="token variable">$JAVA_HOME</span>/lib/dt.jar:<span class="token variable">$JAVA_HOME</span>/lib/tools.jar:<span class="token variable">$JRE_HOME</span>/lib
<span class="token builtin class-name">export</span> <span class="token assign-left variable"><span class="token environment constant">PATH</span></span><span class="token operator">=</span><span class="token environment constant">$PATH</span><span class="token builtin class-name">:</span><span class="token variable">$JAVA_HOME</span>/bin:<span class="token variable">$JRE_HOME</span>/bin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>立即生效</p><div class="language-shelll line-numbers-mode" data-ext="shelll"><pre class="language-shelll"><code>source /etc/profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>检测是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">java</span> <span class="token parameter variable">-version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,17),d=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,[s("openjdk version “11.0.12” 2021-07-20 LTS"),n("br"),s(" OpenJDK Runtime Environment 18.9 (build 11.0.12+7-LTS)"),n("br"),s(" OpenJDK 64-Bit Server VM 18.9 (build 11.0.12+7-LTS, mixed mode, sharing)")])],-1),u=i(`<h3 id="_1-4-在服务器上安装nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-在服务器上安装nginx" aria-hidden="true">#</a> 1.4.在服务器上安装Nginx</h3><h4 id="_1-4-1-安装前环境配置" tabindex="-1"><a class="header-anchor" href="#_1-4-1-安装前环境配置" aria-hidden="true">#</a> 1.4.1.安装前环境配置</h4><p>一般来说，这些环境服务器已经帮你配好了，但还是检测一下，有备无患嘛。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//安装gcc
yum <span class="token function">install</span> gcc-c++
 
//安装PCRE pcre-devel
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> pcre pcre-devel
 
//安装zlib
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> zlib zlib-devel
 
//安装Open SSL
yum <span class="token function">install</span> <span class="token parameter variable">-y</span> openssl openssl-devel
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-2-创建nginx目录并下载安装包" tabindex="-1"><a class="header-anchor" href="#_1-4-2-创建nginx目录并下载安装包" aria-hidden="true">#</a> 1.4.2.创建nginx目录并下载安装包</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//进入usr/local目录
<span class="token builtin class-name">cd</span> /usr/local
 
//创建nginx目录
<span class="token function">mkdir</span> nginx
 
//进入nginx目录
<span class="token builtin class-name">cd</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下载tar包（我下载的是1.22.0版本）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">wget</span> http://nginx.org/download/nginx-1.22.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>解压tar</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">tar</span> <span class="token parameter variable">-xvf</span> nginx-1.22.0.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-4-3-安装nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-3-安装nginx" aria-hidden="true">#</a> 1.4.3.安装nginx</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//进入nginx目录
<span class="token builtin class-name">cd</span> /usr/local/nginx/nginx-1.22.0
 
//执行命令
./configure
 
//执行make命令<span class="token punctuation">(</span>要是执行不成功请检查最开始安装的四个有没有安装成功<span class="token punctuation">)</span>
<span class="token function">make</span>
 
//执行make install命令
<span class="token function">make</span> <span class="token function">install</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-4-4-启动nginx" tabindex="-1"><a class="header-anchor" href="#_1-4-4-启动nginx" aria-hidden="true">#</a> 1.4.4.启动nginx</h4><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>//进入/usr/local/nginx/sbin目录，输入./nginx即可启动nginx
./nginx
 
//关闭nginx
./nginx <span class="token parameter variable">-s</span> quit  或者 ./nginx <span class="token parameter variable">-s</span> stop
 
//重启nginx
./nginx <span class="token parameter variable">-s</span> reload
 
//查看nginx进程
<span class="token function">ps</span> -ef<span class="token operator">|</span><span class="token function">grep</span> nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-修改项目配置文件地址" tabindex="-1"><a class="header-anchor" href="#_1-5-修改项目配置文件地址" aria-hidden="true">#</a> 1.5.修改项目配置文件地址</h3>`,15),v={href:"https://gitee.com/open-iita",target:"_blank",rel:"noopener noreferrer"},m=n("p",null,"如果是其他项目，可能要改动MySQL、Redis等的账号密码。",-1),b=n("h2",{id:"二、后端项目打包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#二、后端项目打包","aria-hidden":"true"},"#"),s(" 二、后端项目打包")],-1),h=n("p",null,"因为不想在服务器上安装太多环境，所以选择在本地打包。",-1),k=n("h3",{id:"_2-1-一般项目打包",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_2-1-一般项目打包","aria-hidden":"true"},"#"),s(" 2.1.一般项目打包")],-1),g=n("p",null,"在Terminal里执行mvn package （需要安装maven环境）",-1),_=n("p",null,"进入target目录就能看到打好的jar包",-1),x=n("p",null,"将jar包拷贝到上级目录，防止target目录清理导致jar包丢失",-1),f={id:"_2-2-iot-iita项目打包",tabindex:"-1"},w=n("a",{class:"header-anchor",href:"#_2-2-iot-iita项目打包","aria-hidden":"true"},"#",-1),y={href:"https://gitee.com/open-iita/iotkit-parent",target:"_blank",rel:"noopener noreferrer"},$=i('<p>在配置好相应的jdk11环境后，推荐使用idea拉取代码，等待项目加载完成以后，先在Terminal里执行mvn clean install，然后在idea的maven操作框上点击下刷新</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/14-46-30-image-20230702173737805-995993.png" alt="1"></p><p>具体的项目可能有具体的打包方式，我这里把jar包上传到服务器 /www/ 新建的project目录下。</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/14-51-54-image-20231017145154119-b68536.png" alt="image-20231017145154119"></p><h2 id="三、前端项目打包" tabindex="-1"><a class="header-anchor" href="#三、前端项目打包" aria-hidden="true">#</a> 三、前端项目打包</h2><h3 id="_3-1-web项目打包" tabindex="-1"><a class="header-anchor" href="#_3-1-web项目打包" aria-hidden="true">#</a> 3.1.Web项目打包</h3><p>使用命令<code>pnpm run build:prod</code>或<code>yarn build:prod</code>，打包完成后会生成一个dist目录，然后将其压缩上传到 /www/wwwroot/ 目录下</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/14-58-58-image-20231017145858566-7a6280.png" alt="image-20231017145858566"></p><p>然后用<code>unzip dist.zip</code>解压</p>',9),j=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"这些命令需要安装node.js并配置相关环境，网上有很多安装教程，这里就不多做解释了。")],-1),q=i(`<h3 id="_3-2-app项目打包" tabindex="-1"><a class="header-anchor" href="#_3-2-app项目打包" aria-hidden="true">#</a> 3.2.App项目打包</h3><h4 id="_3-2-1-创建web文件夹" tabindex="-1"><a class="header-anchor" href="#_3-2-1-创建web文件夹" aria-hidden="true">#</a> 3.2.1.创建web文件夹</h4><p>输入以下命令创建web文件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter create <span class="token builtin class-name">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>然后就会创建一系列web相关的文件，目录结构也会多一个web文件夹。如下图：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/15-11-12-image-20231017151112141-4d9763.png" alt="image-20231017151112141"></p><h4 id="_3-2-2-打包web版本" tabindex="-1"><a class="header-anchor" href="#_3-2-2-打包web版本" aria-hidden="true">#</a> 3.2.2.打包web版本</h4><p>我们知道要给android手机用，需要打包apk出来,，要给iPhone手机用,需要打包ipa出来；同样的道理要给浏览器用，也需要打包web相关代码。</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>flutter build web --web-renderer html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将生成包括资源的应用程序，并将文件放入项目的<code>/build/web</code>目录中。</p><p>一般的应用程序的 release 版本具有以下结构：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>/build/web
  assets
    AssetManifest.json
    FontManifest.json
    NOTICES
    fonts
      MaterialIcons-Regular.ttf
      <span class="token operator">&lt;</span>other font files<span class="token operator">&gt;</span>
    <span class="token operator">&lt;</span>image files<span class="token operator">&gt;</span>
  index.html
  main.dart.js
  main.dart.js.map
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后将web目录压缩，重复3.1步骤</p>`,13),E=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"flutter需要下载并配置相关环境，这里也不做解释了。")],-1),I=i(`<h2 id="四、部署后端项目" tabindex="-1"><a class="header-anchor" href="#四、部署后端项目" aria-hidden="true">#</a> 四、部署后端项目</h2><h3 id="_4-1-一般后端项目启动" tabindex="-1"><a class="header-anchor" href="#_4-1-一般后端项目启动" aria-hidden="true">#</a> 4.1.一般后端项目启动</h3><p>进入对应目录下，后台启动jar包</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">nohup</span> <span class="token function">java</span> <span class="token parameter variable">-jar</span> iot-starter-0.4.5-SNAPSHOT.jar <span class="token operator">&amp;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-iot-iita项目启动" tabindex="-1"><a class="header-anchor" href="#_4-2-iot-iita项目启动" aria-hidden="true">#</a> 4.2.iot-iita项目启动</h3><p>官方的README文件中也有说明，直接执行start.sh就可以启动了。遗憾的是，事情并不能一帆风顺。</p><p>启动失败：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/15-41-19-QQ图片20231017154042-8e6153.png" alt=""></p><p>之后直接通过java -jar 启动才在打印的日志上发现是9200和6379端口被占用了。</p><p><strong>查找被占用端口的进程</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">lsof</span> <span class="token parameter variable">-i</span> :端口号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>通过进程的PID杀死进程</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">kill</span> <span class="token parameter variable">-9</span> PID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>但诡异的是，之后每次启动项目前都要手动杀死两个端口下的进程，才能成功启动。自然而然就会想到stop.sh里的脚本是不完整的。</p><p>改进后的脚本：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token comment"># 项目名称</span>
<span class="token assign-left variable">APPLICATION</span><span class="token operator">=</span><span class="token string">&quot;iot-starter&quot;</span>

<span class="token comment"># 项目启动jar包名称</span>
<span class="token assign-left variable">APPLICATION_JAR</span><span class="token operator">=</span><span class="token string">&quot;iot-starter-0.4.5-SNAPSHOT.jar&quot;</span>

<span class="token comment"># 设置要检查的端口</span>
<span class="token assign-left variable">ES_CHECK</span><span class="token operator">=</span><span class="token number">9200</span>
<span class="token assign-left variable">REDIS_CHECK</span><span class="token operator">=</span><span class="token number">6379</span>

<span class="token comment"># 通过项目名称查找到PI，然后kill -9 pid</span>
<span class="token assign-left variable">PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;<span class="token variable">\${APPLICATION_JAR}</span>&quot;</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token parameter variable">-v</span> <span class="token function">grep</span> <span class="token operator">|</span> <span class="token function">awk</span> <span class="token string">&#39;{ print $2 }&#39;</span><span class="token variable">)</span></span>
<span class="token assign-left variable">ES_PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">lsof</span> <span class="token parameter variable">-t</span> -i:$ES_CHECK<span class="token variable">)</span></span>
<span class="token assign-left variable">REDIS_PID</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">lsof</span> <span class="token parameter variable">-t</span> -i:$REDIS_CHECK<span class="token variable">)</span></span>

<span class="token keyword">if</span> <span class="token punctuation">[</span><span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$PID</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">]</span>
<span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">\${APPLICATION}</span> is already stopped
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token function">kill</span>  <span class="token variable">\${PID}</span>
    <span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">\${PID}</span>
    <span class="token builtin class-name">echo</span> <span class="token variable">\${APPLICATION}</span> stopped successfully
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$ES_PID</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;端口 <span class="token variable">$ES_CHECK</span> 未被占用&quot;</span>
<span class="token keyword">else</span> 
	<span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$ES_PID</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;已杀死进程 <span class="token variable">$ES_PID</span> 占用端口 <span class="token variable">$ES_CHECK</span>.&quot;</span>
<span class="token keyword">fi</span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-z</span> <span class="token string">&quot;<span class="token variable">$REDIS_PID</span>&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;端口 <span class="token variable">$REDIS_CHECK</span> 未被占用&quot;</span>
<span class="token keyword">else</span> 
	<span class="token function">kill</span> <span class="token parameter variable">-9</span> <span class="token variable">$REDIS_PID</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;已杀死进程 <span class="token variable">$REDIS_PID</span> 占用端口 <span class="token variable">$REDIS_CHECK</span>.&quot;</span>
<span class="token keyword">fi</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="五、部署前端项目" tabindex="-1"><a class="header-anchor" href="#五、部署前端项目" aria-hidden="true">#</a> 五、部署前端项目</h2><p>进入到nginx的目录</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/nginx/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/16-02-13-image-20231017160213474-199697.png" alt="image-20231017160213474"></p><p>修改Nginx的配置文件（修改conf文件夹下的nginx.conf文件）</p><ol><li>防止出现权限相关的问题，将文件开头的user修改为root</li></ol><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/17-17-05-image-20231017171705289-cb11e7.png" alt="image-20231017171705289"></p><ol start="2"><li><p>修改监听listen的端口号为8082，这个端口号取决于自己想从几号端口访问前端页面；server_name为你的服务器ip，如果你有域名且配置解析好了，也可以再在此添域名。</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/17-29-23-image-20231017172923089-26bb44.png" alt="image-20231017172923089"></p></li><li><p>找到这些内容并将root 后跟的路径修改为刚才前端代码打包的dist文件夹的路径。</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/17-33-05-image-20231017173305824-8f6c11.png" alt="image-20231017173305824"></p></li><li><p>配置代理，将前端和后端的地址关联起来。</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/17-37-58-image-20231017173758444-e126cc.png" alt="image-20231017173758444"></p></li><li><p>将server复制一份出来，然后修改端口号和root，用于监听不同的端口指向app的静态文件</p></li></ol><p><strong>nginx配置文件nginx.conf的整体代码</strong></p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>
user  root<span class="token punctuation">;</span>
worker_processes  <span class="token number">1</span><span class="token punctuation">;</span>

<span class="token comment">#error_log  logs/error.log;</span>
<span class="token comment">#error_log  logs/error.log  notice;</span>
<span class="token comment">#error_log  logs/error.log  info;</span>

<span class="token comment">#pid        logs/nginx.pid;</span>


events <span class="token punctuation">{</span>
    worker_connections  <span class="token number">1024</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


http <span class="token punctuation">{</span>
    include       mime.types<span class="token punctuation">;</span>
    default_type  application/octet-stream<span class="token punctuation">;</span>

    <span class="token comment">#log_format  main  &#39;$remote_addr - $remote_user [$time_local] &quot;$request&quot; &#39;</span>
    <span class="token comment">#                  &#39;$status $body_bytes_sent &quot;$http_referer&quot; &#39;</span>
    <span class="token comment">#                  &#39;&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;&#39;;</span>

    <span class="token comment">#access_log  logs/access.log  main;</span>

    sendfile        on<span class="token punctuation">;</span>
    <span class="token comment">#tcp_nopush     on;</span>

    <span class="token comment">#keepalive_timeout  0;</span>
    keepalive_timeout  <span class="token number">65</span><span class="token punctuation">;</span>

    <span class="token comment">#gzip  on;</span>
    map <span class="token variable">$http_upgrade</span> <span class="token variable">$connection_upgrade</span> <span class="token punctuation">{</span>
           default upgrade<span class="token punctuation">;</span>
           <span class="token string">&#39;&#39;</span>      close<span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen       <span class="token number">80</span><span class="token punctuation">;</span>
        server_name  localhost<span class="token punctuation">;</span>

        <span class="token comment">#charset koi8-r;</span>

        <span class="token comment">#access_log  logs/host.access.log  main;</span>

        location / <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">#error_page  404              /404.html;</span>

        <span class="token comment"># redirect server error pages to the static page /50x.html</span>
        <span class="token comment">#</span>
        error_page   <span class="token number">500</span> <span class="token number">502</span> <span class="token number">503</span> <span class="token number">504</span>  /50x.html<span class="token punctuation">;</span>
        location <span class="token operator">=</span> /50x.html <span class="token punctuation">{</span>
            root   html<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ \\.php$ {</span>
        <span class="token comment">#    root           html;</span>
        <span class="token comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="token comment">#    fastcgi_index  index.php;</span>
        <span class="token comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="token comment">#    include        fastcgi_params;</span>
        <span class="token comment">#}</span>

        <span class="token comment"># deny access to .htaccess files, if Apache&#39;s document root</span>
        <span class="token comment"># concurs with nginx&#39;s one</span>
        <span class="token comment">#</span>
        <span class="token comment">#location ~ /\\.ht {</span>
        <span class="token comment">#    deny  all;</span>
        <span class="token comment">#}</span>
    <span class="token punctuation">}</span>


    <span class="token comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="token comment">#</span>
    server <span class="token punctuation">{</span>
        listen       <span class="token number">8082</span><span class="token punctuation">;</span>
        <span class="token comment"># listen       somename:8080;</span>
        server_name  ip地址<span class="token punctuation">;</span>

        location / <span class="token punctuation">{</span>
            root   /www/wwwroot/dist<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        
        location /prod-api/ <span class="token punctuation">{</span>
            rewrite /api<span class="token punctuation">(</span>.*<span class="token punctuation">)</span> <span class="token variable">$1</span> <span class="token builtin class-name">break</span><span class="token punctuation">;</span>
            proxy_pass http://ip地址:8086/<span class="token punctuation">;</span>
            proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span>
            proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
            proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
            proxy_set_header REMOTE-HOST <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
            proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
            proxy_set_header Connection <span class="token variable">$connection_upgrade</span><span class="token punctuation">;</span>
            proxy_http_version <span class="token number">1.1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    server <span class="token punctuation">{</span>
        listen       <span class="token number">8084</span><span class="token punctuation">;</span>
    <span class="token comment">#    listen       somename:8080;</span>
        server_name  ip地址<span class="token punctuation">;</span>

        location / <span class="token punctuation">{</span>
            root   /www/wwwroot/build/web<span class="token punctuation">;</span>
            index  index.html index.htm<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        location /prod-api/ <span class="token punctuation">{</span>
            rewrite /api<span class="token punctuation">(</span>.*<span class="token punctuation">)</span> <span class="token variable">$1</span> <span class="token builtin class-name">break</span><span class="token punctuation">;</span>
            proxy_pass http://ip地址:8086/<span class="token punctuation">;</span>
            proxy_set_header Host <span class="token variable">$host</span><span class="token punctuation">;</span>
            proxy_set_header X-Real-IP <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
            proxy_set_header X-Forwarded-For <span class="token variable">$proxy_add_x_forwarded_for</span><span class="token punctuation">;</span>
            proxy_set_header REMOTE-HOST <span class="token variable">$remote_addr</span><span class="token punctuation">;</span>
            proxy_set_header Upgrade <span class="token variable">$http_upgrade</span><span class="token punctuation">;</span>
            proxy_set_header Connection <span class="token variable">$connection_upgrade</span><span class="token punctuation">;</span>
            proxy_http_version <span class="token number">1.1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6"><li><p>端口配置好了后，每次修改了nginx的配置文件后一定要重新启动nginx，使新配置生效。如果重启失败，则先找到nginx的进程，然后将其kill掉，再重启nginx：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 启动nginx</span>
./nginx
<span class="token comment"># 如果已经将nginx配置到全局的环境变量中，就可以直接运行这个命令重启nginx</span>
nginx <span class="token parameter variable">-s</span> reload
<span class="token comment"># 如果没有将其配置到全局的环境变量中，则需要进入安装的nginx/sbin/目录中，用如下命令：</span>
./nginx <span class="token parameter variable">-s</span> reload
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><p><strong>恭喜你项目部署完成，此时就可以在浏览器输入对应的ip和端口访问前端了</strong></p><h2 id="六、部署注意事项" tabindex="-1"><a class="header-anchor" href="#六、部署注意事项" aria-hidden="true">#</a> 六、部署注意事项</h2><h3 id="_6-1-开放防火墙相应端口" tabindex="-1"><a class="header-anchor" href="#_6-1-开放防火墙相应端口" aria-hidden="true">#</a> 6.1.开放防火墙相应端口</h3><p>现在的服务器系统中的防火墙一般是关闭的，而由服务器的供应商帮你进行防火墙规则设置。这里以腾讯云为例，添加项目中用到的端口</p><p>添加规则</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/17-59-40-image-20231017175940703-2c2f3e.png" alt="image-20231017175940703"></p><p>开放需要的端口即可</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/10/17/18-01-19-image-20231017180119865-03de48.png" alt="image-20231017180119865"></p><h3 id="_6-2-部署后端项目启动失败" tabindex="-1"><a class="header-anchor" href="#_6-2-部署后端项目启动失败" aria-hidden="true">#</a> 6.2.部署后端项目启动失败</h3><p>查看是不是后端项目的端口号被占用了</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">netstat</span> <span class="token parameter variable">-anp</span> <span class="token operator">|</span> <span class="token function">grep</span> 端口号
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-3-节省服务器空间" tabindex="-1"><a class="header-anchor" href="#_6-3-节省服务器空间" aria-hidden="true">#</a> 6.3.节省服务器空间</h3><p>前端和后端的项目打包都可以在本地完成，上传服务器可以最小化上传jar包和dist文件夹，这种方式最节省服务器空间资源。</p><p>后端项目只保留jar包即可</p><p>前端项目只保留dist文件夹即可</p><h2 id="七、参考资源" tabindex="-1"><a class="header-anchor" href="#七、参考资源" aria-hidden="true">#</a> 七、参考资源</h2>`,43),P={href:"https://blog.csdn.net/weixin_44248258/article/details/124213606",target:"_blank",rel:"noopener noreferrer"},S={href:"https://developer.aliyun.com/article/1283130#slide-8",target:"_blank",rel:"noopener noreferrer"},A={href:"https://cloud.tencent.com/developer/article/1908180",target:"_blank",rel:"noopener noreferrer"};function C(H,D){const a=t("ExternalLinkIcon");return c(),p("div",null,[o,d,u,n("p",null,[s("由于我部署的这个项目默认集成了一些中间件，所以账号密码啥的都不用动。项目地址-->"),n("a",v,[s("铱塔智联开源"),e(a)])]),m,b,h,k,g,_,x,n("h3",f,[w,s(" 2.2."),n("a",y,[s("iot-iita"),e(a)]),s("项目打包")]),$,j,q,E,I,n("ul",null,[n("li",null,[n("p",null,[n("a",P,[s("云服务器部署前后端分离项目（若依）详细教程_prod-api_Karthus_冲冲冲的博客-CSDN博客"),e(a)])])]),n("li",null,[n("p",null,[n("a",S,[s("SpringBoot前后端分离项目，打包、部署到服务器详细图文流程-阿里云开发者社区 (aliyun.com)"),e(a)])])]),n("li",null,[n("p",null,[n("a",A,[s("flutter项目打包web访问-腾讯云开发者社区-腾讯云 (tencent.com)"),e(a)])])])])])}const M=l(r,[["render",C],["__file","deploy.html.vue"]]);export{M as default};
