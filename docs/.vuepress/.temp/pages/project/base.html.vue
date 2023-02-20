<template><h1 id="搭建路由" tabindex="-1"><a class="header-anchor" href="#搭建路由" aria-hidden="true">#</a> 搭建路由</h1>
<p>每次开发新的功能模块，都需要先进行搭建路由。</p>
<p>所以接下来我们以搭建医院管理-医院设置/医院列表为例，来带大家搭建路由。</p>
<h2 id="新建路由组件" tabindex="-1"><a class="header-anchor" href="#新建路由组件" aria-hidden="true">#</a> 新建路由组件</h2>
<p>我们只需要创建最简单的组件，不需要写具体细节。</p>
<p>我们需要创建两个路由组件：</p>
<ul>
<li>医院设置</li>
</ul>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token comment">// src/pages/hospital/hospitalSet/index.tsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">HospitalSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">HospitalSet</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> HospitalSet<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul>
<li>医院列表</li>
</ul>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token comment">// src/pages/hospital/hospitalList/index.tsx</span>
<span class="token keyword">import</span> React <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">HospitalList</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	<span class="token keyword">return</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token plain-text">HospitalList</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> HospitalList<span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="进行配置路由" tabindex="-1"><a class="header-anchor" href="#进行配置路由" aria-hidden="true">#</a> 进行配置路由</h2>
<p>配置路由，方能通过地址访问我们的路由组件</p>
<div class="language-tsx ext-tsx line-numbers-mode"><pre v-pre class="language-tsx"><code><span class="token comment">// src/routes/index.ts</span>
<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> lazy<span class="token punctuation">,</span> Suspense<span class="token punctuation">,</span> <span class="token constant">FC</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> useRoutes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"react-router-dom"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> HomeOutlined<span class="token punctuation">,</span> ShopOutlined <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"@ant-design/icons"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token keyword">type</span> <span class="token punctuation">{</span> XRoutes <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./types"</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token punctuation">{</span> Layout<span class="token punctuation">,</span> EmptyLayout<span class="token punctuation">,</span> CompLayout <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"../layouts"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Loading <span class="token keyword">from</span> <span class="token string">"@comps/Loading"</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> Redirect <span class="token keyword">from</span> <span class="token string">"@comps/Redirect"</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> Login <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"@pages/login"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> Dashboard <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"@pages/dashboard"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> NotFound <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"@pages/404"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 引入路由组件</span>
<span class="token keyword">const</span> HospitalSet <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"@pages/hospital/hospitalSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> HospitalList <span class="token operator">=</span> <span class="token function">lazy</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"@pages/hospital/hospitalList"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">load</span> <span class="token operator">=</span> <span class="token punctuation">(</span>Comp<span class="token operator">:</span> <span class="token constant">FC</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">(</span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Suspense</span></span> <span class="token attr-name">fallback</span><span class="token script language-javascript"><span class="token script-punctuation punctuation">=</span><span class="token punctuation">{</span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Loading</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">}</span></span><span class="token punctuation">></span></span><span class="token plain-text">
      </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Comp</span></span> <span class="token punctuation">/></span></span><span class="token plain-text">
    </span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span><span class="token class-name">Suspense</span></span><span class="token punctuation">></span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> routes<span class="token operator">:</span> XRoutes <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">"/"</span><span class="token punctuation">,</span>
    element<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">EmptyLayout</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">"login"</span><span class="token punctuation">,</span>
        element<span class="token operator">:</span> <span class="token function">load</span><span class="token punctuation">(</span>Login<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">"/syt"</span><span class="token punctuation">,</span>
    element<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Layout</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
    children<span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        path<span class="token operator">:</span> <span class="token string">"/syt/dashboard"</span><span class="token punctuation">,</span>
        meta<span class="token operator">:</span> <span class="token punctuation">{</span> icon<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">HomeOutlined</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span> title<span class="token operator">:</span> <span class="token string">"首页"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
        element<span class="token operator">:</span> <span class="token function">load</span><span class="token punctuation">(</span>Dashboard<span class="token punctuation">)</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token comment">// 路由配置</span>
      <span class="token comment">// 会自动根据配置来生成左侧菜单</span>
      <span class="token punctuation">{</span>
        <span class="token comment">// 路由访问路径</span>
        path<span class="token operator">:</span> <span class="token string">"/syt/hospital"</span><span class="token punctuation">,</span>
        <span class="token comment">// 将来左侧菜单会根据meta内容生成</span>
        meta<span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token comment">// 菜单图标</span>
          icon<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">ShopOutlined</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
          <span class="token comment">// 菜单标题</span>
          title<span class="token operator">:</span> <span class="token string">"医院管理"</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token comment">// element代表要渲染的组件</span>
        <span class="token comment">// 而父级菜单并不会加载真正的内容，所以渲染的其实就一个Outlet</span>
        <span class="token comment">// Outlet组件就是渲染子路由组件：也就是医院设置、医院列表组件</span>
        element<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">CompLayout</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
        <span class="token comment">// 子路由配置</span>
        children<span class="token operator">:</span> <span class="token punctuation">[</span>
          <span class="token punctuation">{</span>
            path<span class="token operator">:</span> <span class="token string">"/syt/hospital/hospitalSet"</span><span class="token punctuation">,</span>
            meta<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"医院设置"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            element<span class="token operator">:</span> <span class="token function">load</span><span class="token punctuation">(</span>HospitalSet<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span>
            path<span class="token operator">:</span> <span class="token string">"/syt/hospital/hospitalList"</span><span class="token punctuation">,</span>
            meta<span class="token operator">:</span> <span class="token punctuation">{</span> title<span class="token operator">:</span> <span class="token string">"医院列表"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            element<span class="token operator">:</span> <span class="token function">load</span><span class="token punctuation">(</span>HospitalList<span class="token punctuation">)</span><span class="token punctuation">,</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">"/404"</span><span class="token punctuation">,</span>
    element<span class="token operator">:</span> <span class="token function">load</span><span class="token punctuation">(</span>NotFound<span class="token punctuation">)</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    path<span class="token operator">:</span> <span class="token string">"*"</span><span class="token punctuation">,</span>
    element<span class="token operator">:</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span><span class="token class-name">Redirect</span></span> <span class="token attr-name">to</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/404<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 渲染路由</span>
<span class="token comment">// 注意：首字母必须大写</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">RenderRoutes</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// react-router-dom的新增语法。不用自己遍历了，它帮我们遍历生成</span>
  <span class="token keyword">return</span> <span class="token function">useRoutes</span><span class="token punctuation">(</span>routes<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 找到要渲染成左侧菜单的路由</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">findSideBarRoutes</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> currentIndex <span class="token operator">=</span> routes<span class="token punctuation">.</span><span class="token function">findIndex</span><span class="token punctuation">(</span><span class="token punctuation">(</span>route<span class="token punctuation">)</span> <span class="token operator">=></span> route<span class="token punctuation">.</span>path <span class="token operator">===</span> <span class="token string">"/syt"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">return</span> routes<span class="token punctuation">[</span>currentIndex<span class="token punctuation">]</span><span class="token punctuation">.</span>children <span class="token keyword">as</span> XRoutes<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> routes<span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br></div></div><p>此时我们可以打开项目，通过点击左侧菜单，就访问我们定义的路由组件了~</p>
</template>
