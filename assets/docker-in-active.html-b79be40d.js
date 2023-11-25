import{_ as l,r as i,o as c,c as p,a as n,b as e,d as t,e as s}from"./app-a18d955e.js";const o={},d=s(`<p>上一篇我们已经熟悉了Docker的基本用法，接下来可以尝试部署项目了。</p><p>项目说明：</p><ul><li>hmall：商城的后端代码</li><li>hmall-portal：商城用户端的前端代码</li><li>hmall-admin：商城管理端的前端代码</li></ul><p>部署的容器及端口说明：</p><table><thead><tr><th style="text-align:left;"><strong>项目</strong></th><th style="text-align:left;"><strong>容器名</strong></th><th style="text-align:left;"><strong>端口</strong></th><th style="text-align:left;"><strong>备注</strong></th></tr></thead><tbody><tr><td style="text-align:left;">hmall</td><td style="text-align:left;">hmall</td><td style="text-align:left;">8080</td><td style="text-align:left;">黑马商城后端API入口</td></tr><tr><td style="text-align:left;">hmall-portal</td><td style="text-align:left;">nginx</td><td style="text-align:left;">18080</td><td style="text-align:left;">黑马商城用户端入口</td></tr><tr><td style="text-align:left;">hmall-admin</td><td style="text-align:left;">18081</td><td style="text-align:left;">黑马商城管理端入口</td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">mysql</td><td style="text-align:left;">mysql</td><td style="text-align:left;">3306</td><td style="text-align:left;">数据库</td></tr></tbody></table><p>在正式部署前，我们先删除之前的nginx、dd两个容器：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> nginx <span class="token function">dd</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>mysql容器中已经准备好了商城的数据，所以就不再删除了。</p><h2 id="一、部署java项目" tabindex="-1"><a class="header-anchor" href="#一、部署java项目" aria-hidden="true">#</a> 一、部署Java项目</h2><p><code>hmall</code>项目是一个maven聚合项目，使用IDEA打开<code>hmall</code>项目，查看项目结构如图：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-03-42-Snipaste_2023-11-24_17-01-00-650402.png" alt=""></p><p>我们要部署的就是其中的<code>hm-service</code>，其中的配置文件采用了多环境的方式：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-04-02-Snipaste_2023-11-24_17-02-36-b8dbe7.png" alt=""></p><p>其中的<code>application-dev.yaml</code>是部署到开发环境的配置，<code>application-local.yaml</code>是本地运行时的配置。</p><p>查看application.yaml，你会发现其中的JDBC地址并未写死，而是读取变量：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-06-47-image-20231124170647070-f1fd4f.png" alt="image-20231124170647070"></p><p>这两个变量在<code>application-dev.yaml</code>和<code>application-local.yaml</code>中并不相同：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-08-58-image-20231124170858363-790f60.png" alt="image-20231124170858363"></p><p>在dev开发环境（也就是Docker部署时）采用了mysql作为地址，刚好是我们的mysql容器名，只要两者在一个网络，就一定能互相访问。</p><p>我们将项目打包：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-11-09-image-20231124171108985-c3efa3.png" alt="image-20231124171108985"></p><p>结果：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-12-04-image-20231124171204045-278b89.png" alt="image-20231124171204045"></p><p>将<code>hm-service</code>目录下的<code>Dockerfile</code>和<code>hm-service/target</code>目录下的<code>hm-service.jar</code>一起上传到虚拟机的<code>/root/hmall</code>目录：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-13-32-image-20231124171332144-cd28a2.png" alt="image-20231124171332144"></p><p>部署项目:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.构建项目镜像</span>
<span class="token function">docker</span> build <span class="token parameter variable">-t</span> hmall <span class="token builtin class-name">.</span>

<span class="token comment"># 2.查看镜像</span>
<span class="token function">docker</span> images
<span class="token comment"># 结果</span>
REPOSITORY           TAG               IMAGE ID       CREATED          SIZE
hmall                latest            67aa959dd7d1   <span class="token number">13</span> minutes ago   370MB
docker-demo          latest            faa5bd837792   <span class="token number">4</span> days ago       319MB
nginx                latest            605c77e624dd   <span class="token number">23</span> months ago    141MB

<span class="token comment"># 3.创建并运行容器，并通过--network将其加入hmall网络，这样才能通过容器名访问mysql</span>
<span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> hmall <span class="token parameter variable">--network</span> hmall <span class="token parameter variable">-p</span> <span class="token number">8080</span>:8080 hmall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，通过浏览器访问：http://虚拟机地址:8080/search/list</p><h2 id="二、部署前端" tabindex="-1"><a class="header-anchor" href="#二、部署前端" aria-hidden="true">#</a> 二、部署前端</h2><p><code>hmall-portal</code>和<code>hmall-admin</code>是前端代码，需要基于nginx部署。</p><p>nginx的部署目录：</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-18-10-image-20231124171810419-01179b.png" alt="image-20231124171810419"></p><p>其中：</p><ul><li><code>html</code>是静态资源目录，我们需要把<code>hmall-portal</code>以及<code>hmall-admin</code>都复制进去</li><li><code>nginx.conf</code>是nginx的配置文件，主要是完成对<code>html</code>下的两个静态资源目录做代理</li></ul><p>把整个nginx目录上传到虚拟机的<code>/root</code>目录下，然后创建nginx容器并完成两个挂载：</p><ul><li>把<code>/root/nginx/nginx.conf</code>挂载到<code>/etc/nginx/nginx.conf</code></li><li>把<code>/root/nginx/html</code>挂载到<code>/usr/share/nginx/html</code></li></ul><p>由于需要让nginx同时代理hmall-portal和hmall-admin两套前端资源，因此我们需要暴露两个端口：</p><ul><li>18080：对应hmall-portal</li><li>18081：对应hmall-admin</li></ul><p>命令如下：</p><div class="language-Bash line-numbers-mode" data-ext="Bash"><pre class="language-Bash"><code>docker run -d \\
  --name nginx \\
  -p 18080:18080 \\
  -p 18081:18081 \\
  -v /root/nginx/html:/usr/share/nginx/html \\
  -v /root/nginx/nginx.conf:/etc/nginx/nginx.conf \\
  --network hmall \\
  nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试，通过浏览器访问：http://虚拟机ip:18080</p><p><img src="https://qingyuan-1316724565.cos.ap-beijing.myqcloud.com/picture/2023/11/24/17-24-12-image-20231124172412142-fcef3c.png" alt="image-20231124172412142"></p><h2 id="三、dockercompose" tabindex="-1"><a class="header-anchor" href="#三、dockercompose" aria-hidden="true">#</a> 三、DockerCompose</h2><p>稍微复杂的项目，其中会有各种各样的其它中间件，需要部署的东西远不止3个。如果还像之前那样手动的逐一部署，就太麻烦了。</p><p>而Docker Compose就可以帮助我们实现<strong>多个相互关联的Docker容器的快速部署</strong>。它允许用户通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器。</p><h3 id="_3-1-基本语法" tabindex="-1"><a class="header-anchor" href="#_3-1-基本语法" aria-hidden="true">#</a> 3.1.基本语法</h3><p>docker-compose.yml文件的基本语法可以参考官方文档：</p>`,47),r={href:"https://docs.docker.com/compose/compose-file/compose-file-v3/",target:"_blank",rel:"noopener noreferrer"},u=s(`<p>docker-compose文件中可以定义多个相互关联的应用容器，每一个应用容器被称为一个服务（service）。由于service就是在定义某个应用的运行时参数，因此与<code>docker run</code>参数非常相似。对比如下：</p><table><thead><tr><th style="text-align:center;">docker run 参数</th><th style="text-align:center;">docker compose 指令</th><th style="text-align:center;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">--name</td><td style="text-align:center;">container_name</td><td style="text-align:center;">容器名称</td></tr><tr><td style="text-align:center;">-p</td><td style="text-align:center;">ports</td><td style="text-align:center;">端口映射</td></tr><tr><td style="text-align:center;">-e</td><td style="text-align:center;">environment</td><td style="text-align:center;">环境变量</td></tr><tr><td style="text-align:center;">-v</td><td style="text-align:center;">volumes</td><td style="text-align:center;">数据卷配置</td></tr><tr><td style="text-align:center;">--network</td><td style="text-align:center;">networks</td><td style="text-align:center;">网络</td></tr></tbody></table><p>黑马商城部署文件：</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.8&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">mysql</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> mysql
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;3306:3306&quot;</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token key atrule">TZ</span><span class="token punctuation">:</span> Asia/Shanghai
      <span class="token key atrule">MYSQL_ROOT_PASSWORD</span><span class="token punctuation">:</span> <span class="token number">123456</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./mysql/conf:/etc/mysql/conf.d&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./mysql/data:/var/lib/mysql&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./mysql/init:/docker-entrypoint-initdb.d&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hm<span class="token punctuation">-</span>net
  <span class="token key atrule">hmall</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> hmall
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> hmall
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;8080:8080&quot;</span>
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hm<span class="token punctuation">-</span>net
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mysql
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;18080:18080&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;18081:18081&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./nginx/nginx.conf:/etc/nginx/nginx.conf&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;./nginx/html:/usr/share/nginx/html&quot;</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hmall
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> hm<span class="token punctuation">-</span>net
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">hm-net</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> hmall
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-2-基础命令" tabindex="-1"><a class="header-anchor" href="#_3-2-基础命令" aria-hidden="true">#</a> 3.2.基础命令</h3><p>编写好docker-compose.yml文件，就可以部署项目了。常见的命令：</p>`,6),m={href:"https://docs.docker.com/compose/reference/",target:"_blank",rel:"noopener noreferrer"},v=s(`<p>基本语法如下：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">docker</span> compose <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中，OPTIONS和COMMAND都是可选参数，比较常见的有：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>OPTIONS:
<span class="token parameter variable">-f</span>	指定compose文件的路径和名称
<span class="token parameter variable">-p</span>	指定project名称。project就是当前compose文件中设置的多个service的集合，是逻辑概念
COMMAND:
up	创建并启动所有service容器
down	停止并移除所有的容器、网络
<span class="token function">ps</span>	列出所有启动的容器
logs	查看指定容器的日志
stop	停止容器
start	启动容器
restart	重启容器
<span class="token function">top</span>	查看运行的进程
<span class="token builtin class-name">exec</span>	在指定的运行容器中执行命令
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>演示：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 1.进入root目录</span>
<span class="token builtin class-name">cd</span> /root

<span class="token comment"># 2.删除所有旧容器</span>
<span class="token function">docker</span> <span class="token function">rm</span> <span class="token parameter variable">-f</span> <span class="token variable"><span class="token variable">$(</span><span class="token function">docker</span> <span class="token function">ps</span> <span class="token parameter variable">-qa</span><span class="token variable">)</span></span>


<span class="token comment"># 3.启动所有, -d 参数是后台启动</span>
<span class="token function">docker</span> compose up <span class="token parameter variable">-d</span>
<span class="token comment"># 结果：</span>
<span class="token punctuation">[</span>+<span class="token punctuation">]</span> Running <span class="token number">4</span>/4
 ✔ Network hmall    Created                                                                                                                                                                          <span class="token number">0</span>.1s 
 ✔ Container mysql  Started                                                                                                                                                                          <span class="token number">0</span>.5s 
 ✔ Container hmall  Started                                                                                                                                                                          <span class="token number">0</span>.7s 
 ✔ Container nginx  Started                                                                                                                                                                          <span class="token number">1</span>.1s 
<span class="token comment"># 4.查看容器</span>
<span class="token function">docker</span> compose <span class="token function">ps</span>
<span class="token comment"># 结果：</span>
NAME                IMAGE               COMMAND                  SERVICE             CREATED             STATUS              PORTS
hmall               hmall               <span class="token string">&quot;java -jar /app.jar&quot;</span>     hmall               <span class="token number">42</span> seconds ago      Up <span class="token number">41</span> seconds       <span class="token number">0.0</span>.0.0:8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp, :::8080-<span class="token operator">&gt;</span><span class="token number">8080</span>/tcp
mysql               mysql               <span class="token string">&quot;docker-entrypoint.s…&quot;</span>   mysql               <span class="token number">42</span> seconds ago      Up <span class="token number">41</span> seconds       <span class="token number">0.0</span>.0.0:3306-<span class="token operator">&gt;</span><span class="token number">3306</span>/tcp, :::3306-<span class="token operator">&gt;</span><span class="token number">3306</span>/tcp, <span class="token number">33060</span>/tcp
nginx               nginx               <span class="token string">&quot;/docker-entrypoint.…&quot;</span>   nginx               <span class="token number">42</span> seconds ago      Up <span class="token number">40</span> seconds       <span class="token number">80</span>/tcp, <span class="token number">0.0</span>.0.0:18080-18081-<span class="token operator">&gt;</span><span class="token number">18080</span>-18081/tcp, :::18080-18081-<span class="token operator">&gt;</span><span class="token number">18080</span>-18081/tcp
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>访问：http://虚拟机ip:18080</p>`,7);function k(b,g){const a=i("ExternalLinkIcon");return c(),p("div",null,[d,n("blockquote",null,[n("p",null,[n("a",r,[e("Compose file version 3 reference | Docker Docs"),t(a)])])]),u,n("blockquote",null,[n("p",null,[n("a",m,[e("Overview of docker compose CLI | Docker Docs"),t(a)])])]),v])}const y=l(o,[["render",k],["__file","docker-in-active.html.vue"]]);export{y as default};
