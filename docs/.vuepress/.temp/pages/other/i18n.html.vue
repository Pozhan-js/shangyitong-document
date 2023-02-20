<template><h1 id="国际化" tabindex="-1"><a class="header-anchor" href="#国际化" aria-hidden="true">#</a> 国际化</h1>
<h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍" aria-hidden="true">#</a> 介绍</h2>
<p>国际化（internationalization），简称为 <code>i18n</code>。</p>
<p>为了根据不同语言来显示相应的界面。</p>
<p>项目中国际化分为两部分进行：</p>
<ol>
<li>antd 组件/文字的国际化</li>
<li>自定义组件/文字的国际化</li>
</ol>
<p>原因： antd 组件内部已经写死了一些文字，我们不能直接修改。而自己组件定义的文字就需要自己修改了。</p>
<p>针对第一种情况：我们使用 antd 的 <code>ConfigProvider</code> 组件来完成。</p>
<p>针对第二种情况：我们使用 <code>react-i18next</code> 库来完成。</p>
<h2 id="configprovider" tabindex="-1"><a class="header-anchor" href="#configprovider" aria-hidden="true">#</a> <code>ConfigProvider</code></h2>
<ul>
<li>src/App.tsx</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> ConfigProvider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"antd"</span><span class="token punctuation">;</span>
<span class="token comment">// 引入antd语言包</span>
<span class="token keyword">import</span> zhCN <span class="token keyword">from</span> <span class="token string">"antd/lib/locale/zh_CN"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> enUS <span class="token keyword">from</span> <span class="token string">"antd/lib/locale/en_US"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> useAppSelector <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/app/hooks"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> selectLang <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/app/slice"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> RenderRoutes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./routes"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">App</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 从redux中读取当前语言环境</span>
  <span class="token keyword">const</span> lang <span class="token operator">=</span> <span class="token function">useAppSelector</span><span class="token punctuation">(</span>selectLang<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 内部通过context通信，可以将所有后代antd的组件的语言一键修改</span>
  <span class="token comment">// 通过修改locale，指定不同的语言包就能实现</span>
  <span class="token comment">// 语言包直接使用antd提供的即可</span>
  <span class="token keyword">return</span> <span class="token operator">&lt;</span>ConfigProvider locale<span class="token operator">=</span><span class="token punctuation">{</span>lang <span class="token operator">===</span> <span class="token string">"zh_CN"</span> <span class="token operator">?</span> zhCN <span class="token operator">:</span> enUS<span class="token punctuation">}</span><span class="token operator">></span><span class="token punctuation">{</span><span class="token function">RenderRoutes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token operator">&lt;</span><span class="token operator">/</span>ConfigProvider<span class="token operator">></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> App<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>以上项目中已经配置好了，不需要修改了</p>
<h2 id="react-i18next" tabindex="-1"><a class="header-anchor" href="#react-i18next" aria-hidden="true">#</a> <code>react-i18next</code></h2>
<h3 id="_1-配置" tabindex="-1"><a class="header-anchor" href="#_1-配置" aria-hidden="true">#</a> 1. 配置</h3>
<ul>
<li>src/locales/i18n.ts</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> i18n <span class="token keyword">from</span> <span class="token string">"i18next"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> initReactI18next <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-i18next"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> en_US <span class="token keyword">from</span> <span class="token string">"./lang/en_US"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> zh_CN <span class="token keyword">from</span> <span class="token string">"./lang/zh_CN"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@/app/store"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> resources <span class="token operator">=</span> <span class="token punctuation">{</span>
  zh_CN<span class="token punctuation">,</span>
  en_US<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

i18n<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>initReactI18next<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">init</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  resources<span class="token punctuation">,</span> <span class="token comment">// 所有语言包</span>
  lng<span class="token operator">:</span> store<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>app<span class="token punctuation">.</span>lang<span class="token punctuation">,</span> <span class="token comment">// 从redux中加载语言环境，初始化语言</span>
  interpolation<span class="token operator">:</span> <span class="token punctuation">{</span>
    escapeValue<span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// react已经转义了，不需要再做了</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> i18n<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><ul>
<li>src/index.ts</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createRoot <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-dom/client"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> BrowserRouter <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> store <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./app/store"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> Provider <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-redux"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> App <span class="token keyword">from</span> <span class="token string">"./App"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> reportWebVitals <span class="token keyword">from</span> <span class="token string">"./reportWebVitals"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token string">"./locales/i18n"</span><span class="token punctuation">;</span> <span class="token comment">// 引入国际化，使其生效</span>

<span class="token keyword">import</span> <span class="token string">"antd/dist/antd.less"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token string">"./styles/index.css"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> root <span class="token operator">=</span> <span class="token function">createRoot</span><span class="token punctuation">(</span>document<span class="token punctuation">.</span><span class="token function">getElementById</span><span class="token punctuation">(</span><span class="token string">"root"</span><span class="token punctuation">)</span> <span class="token keyword">as</span> HTMLElement<span class="token punctuation">)</span><span class="token punctuation">;</span>

root<span class="token punctuation">.</span><span class="token function">render</span><span class="token punctuation">(</span>
  <span class="token operator">&lt;</span>React<span class="token punctuation">.</span>StrictMode<span class="token operator">></span>
    <span class="token operator">&lt;</span>BrowserRouter<span class="token operator">></span>
      <span class="token operator">&lt;</span>Provider store<span class="token operator">=</span><span class="token punctuation">{</span>store<span class="token punctuation">}</span><span class="token operator">></span>
        <span class="token operator">&lt;</span>App <span class="token operator">/</span><span class="token operator">></span>
      <span class="token operator">&lt;</span><span class="token operator">/</span>Provider<span class="token operator">></span>
    <span class="token operator">&lt;</span><span class="token operator">/</span>BrowserRouter<span class="token operator">></span>
  <span class="token operator">&lt;</span><span class="token operator">/</span>React<span class="token punctuation">.</span>StrictMode<span class="token operator">></span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// If you want to start measuring performance in your app, pass a function</span>
<span class="token comment">// to log results (for example: reportWebVitals(console.log))</span>
<span class="token comment">// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals</span>
<span class="token function">reportWebVitals</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// reportWebVitals(console.log); // 会将生成的性能报告打印出来</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><p>以上项目中已经配置好了，不需要修改了</p>
<h3 id="_2-使用" tabindex="-1"><a class="header-anchor" href="#_2-使用" aria-hidden="true">#</a> 2. 使用</h3>
<ol>
<li>定义语言包</li>
</ol>
<ul>
<li>src/locales/lang/en_US 下面定义英语语言包</li>
<li>src/locales/lang/zh_CN 下面定义中文语言包</li>
</ul>
<p>例如：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// src/locales/lang/en_US/test.ts</span>
<span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token punctuation">{</span>
  ok<span class="token operator">:</span> <span class="token string">"ok"</span><span class="token punctuation">,</span>
  cancel<span class="token operator">:</span> <span class="token string">"cancel"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> test<span class="token punctuation">;</span>
<span class="token comment">// src/locales/lang/zh_CN/test.ts</span>
<span class="token keyword">const</span> test <span class="token operator">=</span> <span class="token punctuation">{</span>
  ok<span class="token operator">:</span> <span class="token string">"确定"</span><span class="token punctuation">,</span>
  cancel<span class="token operator">:</span> <span class="token string">"取消"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> test<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><strong>注意：中英文语言包的属性名（key）必须一样，切换时才能生效。</strong></p>
<ol>
<li>组件使用</li>
</ol>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span> useTranslation <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-i18next"</span><span class="token punctuation">;</span>

<span class="token comment">// 注意hooks函数只能在函数组件中使用！</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> t<span class="token punctuation">,</span> i18n <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useTranslation</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">"test"</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 代表使用语言包中test文件内容</span>

<span class="token comment">// 使用语言</span>
<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">"ok"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 中文语言下返回：确定，英语语言下返回：ok</span>
<span class="token function">t</span><span class="token punctuation">(</span><span class="token string">"cancel"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 中文语言下返回：取消，英语语言下返回：cancel</span>

<span class="token comment">// 切换语言</span>
i18n<span class="token punctuation">.</span><span class="token function">changeLanguage</span><span class="token punctuation">(</span><span class="token string">"zh_CN"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 切换成中文</span>
i18n<span class="token punctuation">.</span><span class="token function">changeLanguage</span><span class="token punctuation">(</span><span class="token string">"en_US"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 切换成英语</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div></template>
