<template><h1 id="项目功能演示" tabindex="-1"><a class="header-anchor" href="#项目功能演示" aria-hidden="true">#</a> 项目功能演示</h1>
<h2 id="下载依赖" tabindex="-1"><a class="header-anchor" href="#下载依赖" aria-hidden="true">#</a> 下载依赖</h2>
<p><strong>建议使用 yarn 下载依赖</strong></p>
<ol>
<li>安装 yarn</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>npm i yarn -g
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol start="2">
<li>配置 yarn 的淘宝镜像</li>
</ol>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn config set registry https://registry.npmmirror.com/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>原来淘宝镜像地址即将失效，注意更换新的。</p>
<blockquote>
<p><a href="https://zhuanlan.zhihu.com/p/465424728" target="_blank" rel="noopener noreferrer">淘宝 npm 域名即将切换<ExternalLinkIcon/></a></p>
</blockquote>
<ol start="3">
<li>下载依赖</li>
</ol>
<p><strong>注意来到项目根目录</strong></p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="运行指令" tabindex="-1"><a class="header-anchor" href="#运行指令" aria-hidden="true">#</a> 运行指令</h2>
<p>运行项目的命令都在 package.json 中 scripts 里面</p>
<ul>
<li>启动开发环境: 查看项目运行效果</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn start 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li>启动生产环境：项目打包上线</li>
</ul>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>yarn build 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="查看效果" tabindex="-1"><a class="header-anchor" href="#查看效果" aria-hidden="true">#</a> 查看效果</h2>
<p>开发环境下会自动打开浏览器，我们直接查看效果</p>
</template>
