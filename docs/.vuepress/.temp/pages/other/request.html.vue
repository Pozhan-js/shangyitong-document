<template><h1 id="发送请求流程" tabindex="-1"><a class="header-anchor" href="#发送请求流程" aria-hidden="true">#</a> 发送请求流程</h1>
<h2 id="查看接口文档" tabindex="-1"><a class="header-anchor" href="#查看接口文档" aria-hidden="true">#</a> 查看接口文档</h2>
<blockquote>
<p><a href="/intro/3.html" target="_blank" rel="noopener noreferrer">戳我查看接口文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>此时我们需要掌握一下内容：</p>
<p><img src="/imgs/project/1.png" alt="接口文档"></p>
<p><img src="/imgs/project/2.png" alt="接口文档"></p>
<h2 id="对-测试接口" tabindex="-1"><a class="header-anchor" href="#对-测试接口" aria-hidden="true">#</a> 对/测试接口</h2>
<p>可以使用 postman 对接口进行详细测试。</p>
<p>测试接口的目的：为了确定请求参数有哪些，在哪写，接口功能，接口返回值情况。</p>
<h2 id="接口参数说明" tabindex="-1"><a class="header-anchor" href="#接口参数说明" aria-hidden="true">#</a> 接口参数说明</h2>
<ul>
<li>path：说明参数是地址参数</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 其中1和10就是请求参数</span>
request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/user/list/1/10"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>query：说明参数是查询字符串参数</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// query参数位于params</span>
request<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/user/list"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> params<span class="token operator">:</span> <span class="token punctuation">{</span> page<span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> limit<span class="token operator">:</span> <span class="token number">10</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>body：说明参数是请求体参数</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 如果是post/put请求:</span>
request<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">"/user/login"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> username<span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span> password<span class="token operator">:</span> <span class="token string">"111111"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 如果是get/delete请求:</span>
request<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">"/user/login"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> data<span class="token operator">:</span> <span class="token punctuation">{</span> username<span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span> password<span class="token operator">:</span> <span class="token string">"111111"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="定义接口函数" tabindex="-1"><a class="header-anchor" href="#定义接口函数" aria-hidden="true">#</a> 定义接口函数</h2>
<p>来到 api 目录下定义接口函数</p>
<p>发送请求的函数：request</p>
<ul>
<li>定义接口函数</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> request <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/utils/http"</span><span class="token punctuation">;</span>

<span class="token comment">// 登录</span>
<span class="token comment">// 请求参数的类型也需要定义</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">reqLogin</span> <span class="token operator">=</span> <span class="token punctuation">(</span>username<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">,</span> password<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// &lt;any, string>的第一个类型为any即可，实际不会用上</span>
  <span class="token comment">// 第二个类型是返回值数据中data的类型，根据接口文档填写</span>
  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">post</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> <span class="token builtin">string</span><span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"/user/login"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
    username<span class="token punctuation">,</span>
    password<span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 查询用户信息</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">reqGetInfo</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 返回值类型简单直接写</span>
  <span class="token comment">// 返回值类型复杂就需要单独定义</span>
  <span class="token keyword">return</span> request<span class="token punctuation">.</span><span class="token generic-function"><span class="token function">get</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token punctuation">,</span> GetInfoResponse<span class="token operator">></span></span></span><span class="token punctuation">(</span><span class="token string">"/user/info"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><ul>
<li>定义接口函数返回值数据类型</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">GetInfoResponse</span> <span class="token punctuation">{</span>
  name<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  avatar<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
  routes<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  buttons<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="组件引入使用" tabindex="-1"><a class="header-anchor" href="#组件引入使用" aria-hidden="true">#</a> 组件引入使用</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> reqLogin <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@api/user/index.ts"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></template>
