import{_ as n,e as s}from"./app.0f71b86d.js";var a="/syt-admin-docs/imgs/intro/proxy.png";const t={},p=s(`<h1 id="\u9879\u76EE\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u914D\u7F6E" aria-hidden="true">#</a> \u9879\u76EE\u914D\u7F6E</h1><h2 id="\u8DEF\u5F84\u522B\u540D" tabindex="-1"><a class="header-anchor" href="#\u8DEF\u5F84\u522B\u540D" aria-hidden="true">#</a> \u8DEF\u5F84\u522B\u540D</h2><h3 id="\u6982\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u6982\u8FF0" aria-hidden="true">#</a> \u6982\u8FF0</h3><p>\u5F00\u53D1\u65F6\u5F53\u7EC4\u4EF6\u5C42\u7EA7\u592A\u6DF1\u65F6\uFF0C\u6211\u4EEC\u5F15\u5165\u5176\u4ED6\u76EE\u5F55\u4E0B\u6587\u4EF6\u9700\u8981\u56DE\u9000\u5F88\u591A\u5C42\u76EE\u5F55\uFF0C\u5F88\u9EBB\u70E6\u3002</p><p>\u8DEF\u5F84\u522B\u540D\u5219\u63D0\u4F9B\u53E6\u5916\u4E00\u79CD\u5199\u8DEF\u5F84\u7684\u65B9\u5F0F\uFF0C\u6216\u8005\u8BF4\u8DEF\u5F84\u7B80\u5199\uFF0C\u8BA9\u6211\u4EEC\u53EF\u4EE5\u4ECE\u6839\u8DEF\u5F84\u51FA\u53D1\u76F4\u63A5\u5199\u8DEF\u5F84\uFF0C\u7B80\u5355\u65B9\u4FBF\u3002</p><h3 id="\u914D\u7F6E" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E" aria-hidden="true">#</a> \u914D\u7F6E</h3><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token comment">// tsconfig.extend.json</span>
<span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;baseUrl&quot;</span><span class="token operator">:</span> <span class="token string">&quot;.&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;paths&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;@/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;@api/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/api/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;@assets/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/assets/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;@comps/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/components/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;@utils/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/utils/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      <span class="token property">&quot;@pages/*&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;./src/pages/*&quot;</span><span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>\u5185\u90E8\u8FD8\u505A\u4E86\u4E24\u4EF6\u4E8B\uFF1A</p><ol><li>\u5B9E\u73B0\u529F\u80FD\uFF1A\u901A\u8FC7\u63D2\u4EF6\u5C06\u4E0A\u8FF0\u914D\u7F6E\u52A0\u8F7D\u5230 <code>craco.config.js</code> , \u6700\u7EC8\u4F1A\u4FEE\u6539 <code>React</code> \u811A\u624B\u67B6\u914D\u7F6E\uFF0C\u6240\u4EE5\u5C31\u53EF\u4EE5\u9879\u76EE\u4E2D\u4F7F\u7528\u4E0A\u8FF0\u8DEF\u5F84\u522B\u540D\u3002</li><li>\u8DEF\u5F84\u63D0\u793A\uFF1A\u901A\u8FC7 extends \u5C06\u4E0A\u8FF0\u914D\u7F6E\u52A0\u8F7D\u5230 <code>tsconfig.json</code> \u4E2D\uFF0C\u6B64\u65F6\u5728 <code>VSCode</code> \u5199\u4EE3\u7801\u624D\u4F1A\u6709\u8DEF\u5F84\u63D0\u793A\u3002</li></ol><p>\u6211\u4EEC\u5C06\u6765\u5982\u679C\u8981\u6DFB\u52A0\u65B0\u7684\u8DEF\u5F84\u522B\u540D\uFF0C\u53EA\u9700\u8981\u4FEE\u6539 <code>tsconfig.extend.json</code> \u5373\u53EF\u3002</p><h2 id="\u4EE3\u7406\u670D\u52A1\u5668" tabindex="-1"><a class="header-anchor" href="#\u4EE3\u7406\u670D\u52A1\u5668" aria-hidden="true">#</a> \u4EE3\u7406\u670D\u52A1\u5668</h2><h3 id="\u6982\u8FF0-1" tabindex="-1"><a class="header-anchor" href="#\u6982\u8FF0-1" aria-hidden="true">#</a> \u6982\u8FF0</h3><p>\u4EE3\u7406\u670D\u52A1\u5668\u53EF\u4EE5\u89E3\u51B3\u5F00\u53D1\u65F6\u7684\u8DE8\u57DF\u95EE\u9898\u3002</p><h3 id="\u539F\u7406\u56FE" tabindex="-1"><a class="header-anchor" href="#\u539F\u7406\u56FE" aria-hidden="true">#</a> \u539F\u7406\u56FE</h3><p><img src="`+a+`" alt="\u4EE3\u7406\u670D\u52A1\u5668"></p><h3 id="\u914D\u7F6E-1" tabindex="-1"><a class="header-anchor" href="#\u914D\u7F6E-1" aria-hidden="true">#</a> \u914D\u7F6E</h3><p>\u6FC0\u6D3B\u5F00\u53D1\u670D\u52A1\u5668\u4EE3\u7406\u529F\u80FD\uFF0C\u5C31\u8981\u8FDB\u884C\u4EE3\u7406\u670D\u52A1\u6B66\u914D\u7F6E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// craco.config.js</span>
<span class="token keyword">const</span> CracoLessPlugin <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;craco-less&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> CracoAlias <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;craco-alias&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">plugins</span><span class="token operator">:</span> <span class="token punctuation">[</span>
		<span class="token comment">// \u81EA\u5B9A\u4E49\u4E3B\u9898</span>
		<span class="token punctuation">{</span>
			<span class="token literal-property property">plugin</span><span class="token operator">:</span> CracoLessPlugin<span class="token punctuation">,</span>
			<span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">lessLoaderOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
					<span class="token literal-property property">lessOptions</span><span class="token operator">:</span> <span class="token punctuation">{</span>
						<span class="token comment">// modifyVars: { &quot;@primary-color&quot;: &quot;#1DA57A&quot; },</span>
						<span class="token literal-property property">javascriptEnabled</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
					<span class="token punctuation">}</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token comment">// \u8DEF\u5F84\u522B\u540D</span>
		<span class="token punctuation">{</span>
			<span class="token literal-property property">plugin</span><span class="token operator">:</span> CracoAlias<span class="token punctuation">,</span>
			<span class="token literal-property property">options</span><span class="token operator">:</span> <span class="token punctuation">{</span>
				<span class="token literal-property property">source</span><span class="token operator">:</span> <span class="token string">&quot;tsconfig&quot;</span><span class="token punctuation">,</span>
				<span class="token literal-property property">baseUrl</span><span class="token operator">:</span> <span class="token string">&quot;./&quot;</span><span class="token punctuation">,</span>
				<span class="token literal-property property">tsConfigPath</span><span class="token operator">:</span> <span class="token string">&quot;./tsconfig.extend.json&quot;</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">]</span><span class="token punctuation">,</span>
	<span class="token comment">// \u5F00\u53D1\u670D\u52A1\u5668\u914D\u7F6E</span>
	<span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
		<span class="token comment">// \u6FC0\u6D3B\u4EE3\u7406\u670D\u52A1\u5668</span>
		<span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
			<span class="token comment">// \u5C06\u6765\u4EE5/dev-api\u5F00\u5934\u7684\u8BF7\u6C42\uFF0C\u5C31\u4F1A\u88AB\u5F00\u53D1\u670D\u52A1\u5668\u8F6C\u53D1\u5230\u76EE\u6807\u670D\u52A1\u5668\u53BB\u3002</span>
			<span class="token string-property property">&quot;/dev-api&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// \u9700\u8981\u8F6C\u53D1\u7684\u8BF7\u6C42\u524D\u7F00</span>
				<span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;http://syt-api.atguigu.cn&quot;</span><span class="token punctuation">,</span> <span class="token comment">// \u76EE\u6807\u670D\u52A1\u5668\u5730\u5740</span>
				<span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// \u5141\u8BB8\u8DE8\u57DF</span>
				<span class="token literal-property property">pathRewrite</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// \u8DEF\u5F84\u91CD\u5199</span>
					<span class="token string-property property">&quot;^/dev-api&quot;</span><span class="token operator">:</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">,</span>
				<span class="token punctuation">}</span><span class="token punctuation">,</span>
			<span class="token punctuation">}</span><span class="token punctuation">,</span>
		<span class="token punctuation">}</span><span class="token punctuation">,</span>
	<span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><div class="highlight-line">\xA0</div><br></div><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br></div></div><p>\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u4E00\u65E6\u751F\u4EA7\u73AF\u5883\u6253\u5305\u9879\u76EE\uFF0C\u670D\u52A1\u5668\u4EE5\u53CA\u76F8\u5173\u914D\u7F6E\u5E76\u4E0D\u4F1A\u6253\u5305\u8FDB\u53BB\uFF0C\u6240\u4EE5\u5982\u679C\u8FD0\u884C\u6253\u5305\u540E\u7684\u9879\u76EE\uFF0C\u8FD8\u4F1A\u4EA7\u751F\u8DE8\u57DF\u95EE\u9898\u3002</p><p>\u6700\u7EC8\u8FD8\u662F\u9700\u8981\u670D\u52A1\u7AEF\u6765\u89E3\u51B3\uFF0C\u5C06\u6765\u6211\u4EEC\u4F1A\u5B66\u4E60 <code>nginx</code> \u6765\u89E3\u51B3\u6B64\u95EE\u9898\u3002</p>`,20);function e(o,r){return p}var l=n(t,[["render",e],["__file","index.html.vue"]]);export{l as default};