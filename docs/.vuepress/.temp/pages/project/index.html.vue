<template><h1 id="项目-git-管理" tabindex="-1"><a class="header-anchor" href="#项目-git-管理" aria-hidden="true">#</a> 项目 Git 管理</h1>
<p>我们需要对项目进行 Git 管理</p>
<p>Git 管理需要做的事情大致为两个步骤：</p>
<ol>
<li>本地仓库版本控制</li>
<li>本地仓库与远程仓库的交互</li>
</ol>
<p><strong>要进行 Git 管理永远是先进行本地仓库版本控制，在考虑本地仓库与远程仓库的交互</strong></p>
<h2 id="本地仓库版本控制" tabindex="-1"><a class="header-anchor" href="#本地仓库版本控制" aria-hidden="true">#</a> 本地仓库版本控制</h2>
<ol>
<li><code>git init</code></li>
</ol>
<p>将当前目录初始化成 git 仓库。（仅需要做一次即可）</p>
<ol start="2">
<li><code>git add .</code></li>
</ol>
<p>将工作区代码添加到暂存区</p>
<ol start="3">
<li><code>git commit -m xxx</code></li>
</ol>
<p>将暂存区代码添加到版本区，进行本地版本控制</p>
<h2 id="本地仓库与远程仓库的交互" tabindex="-1"><a class="header-anchor" href="#本地仓库与远程仓库的交互" aria-hidden="true">#</a> 本地仓库与远程仓库的交互</h2>
<h3 id="_1-预备" tabindex="-1"><a class="header-anchor" href="#_1-预备" aria-hidden="true">#</a> 1. 预备</h3>
<p>要和远程仓库进行交互，需要相关负责人提供：</p>
<ul>
<li>仓库地址</li>
<li>账号密码</li>
</ul>
<h3 id="_2-远程有仓库-本地没有" tabindex="-1"><a class="header-anchor" href="#_2-远程有仓库-本地没有" aria-hidden="true">#</a> 2. 远程有仓库，本地没有</h3>
<p>场景：入职新员工拉取代码</p>
<p>需求：需要将远程仓库拉取到本地进行开发。</p>
<ul>
<li><code>git clone 仓库地址</code></li>
</ul>
<p>将远程仓库克隆到本地来。</p>
<p>注意：此时只会克隆 master 分支。</p>
<ul>
<li><code>cd 仓库名称</code></li>
</ul>
<p>进入仓库内</p>
<ul>
<li><code>git fetch origin xxx:xxx</code></li>
</ul>
<p>拉取远程仓库 xxx 分支代码到本地仓库的 xxx 分支上来。（如果本地没有 xxx 分支，会自动创建）</p>
<p>此时 xxx 分支代码就到本地了</p>
<ul>
<li><code>git checkout xxx</code></li>
</ul>
<p>切换到 xxx 分支查看代码</p>
<h3 id="_3-本地有仓库-远程没有" tabindex="-1"><a class="header-anchor" href="#_3-本地有仓库-远程没有" aria-hidden="true">#</a> 3. 本地有仓库，远程没有</h3>
<p>场景：自己开发代码</p>
<p>需求：需要将本地仓库提交到远程仓库进行代码管理，方便其他人查看。</p>
<ul>
<li>
<p>先进行本地仓库的版本控制</p>
</li>
<li>
<p>新建远程仓库</p>
</li>
<li>
<p><code>git remote add origin 仓库地址</code></p>
</li>
</ul>
<p>将本地仓库与远程仓库关联起来。（只能做一次，第二次无效）</p>
<ul>
<li><code>git push origin xxx</code></li>
</ul>
<p>将本地仓库 xxx 分支代码提交到远程仓库 xxx 分支保管</p>
<p>这里建议：先推送 master 分支，在推送其他分支。</p>
<h3 id="_4-本地仓库、远程仓库都有-并且已经关联好了" tabindex="-1"><a class="header-anchor" href="#_4-本地仓库、远程仓库都有-并且已经关联好了" aria-hidden="true">#</a> 4. 本地仓库、远程仓库都有，并且已经关联好了</h3>
<p>当前面操作做完后，本地仓库、远程仓库都有，并且已经关联好了。</p>
<p>当我们需要查看其他人代码时，可以使用这个指令：</p>
<ul>
<li><code>git pull origin xxx</code></li>
</ul>
<p>当我们需要推送自己代码时，可以使用这个指令：</p>
<ul>
<li><code>git push origin xxx</code></li>
</ul>
</template>
