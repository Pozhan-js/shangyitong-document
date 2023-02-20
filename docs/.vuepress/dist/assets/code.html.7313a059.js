import{_ as n,e as s}from"./app.0f71b86d.js";const a={},e=s(`<h1 id="\u9879\u76EE\u4EE3\u7801" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u4EE3\u7801" aria-hidden="true">#</a> \u9879\u76EE\u4EE3\u7801</h1><h2 id="\u9879\u76EE\u57FA\u7840\u6A21\u677F" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u57FA\u7840\u6A21\u677F" aria-hidden="true">#</a> \u9879\u76EE\u57FA\u7840\u6A21\u677F</h2><p>\u8BE6\u89C1<code>syt-admin-base</code>\u9879\u76EE</p><h2 id="\u9879\u76EE\u76EE\u5F55\u6587\u4EF6\u4ECB\u7ECD" tabindex="-1"><a class="header-anchor" href="#\u9879\u76EE\u76EE\u5F55\u6587\u4EF6\u4ECB\u7ECD" aria-hidden="true">#</a> \u9879\u76EE\u76EE\u5F55\u6587\u4EF6\u4ECB\u7ECD</h2><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>\u251C\u2500\u2500 public # \u516C\u5171\u9759\u6001\u8D44\u6E90\u76EE\u5F55
\u2502   \u251C\u2500\u2500 favicon.ico # \u7F51\u7AD9\u56FE\u6807
\u2502   \u251C\u2500\u2500 index.html # \u4E3B\u9875\u9762
\u2502   \u251C\u2500\u2500 logo192.png # app\u56FE\u6807
\u2502   \u251C\u2500\u2500 logo512.png # app\u56FE\u6807
\u2502   \u251C\u2500\u2500 manifest.json # app\u914D\u7F6E\u6587\u4EF6
\u2502   \u2514\u2500\u2500 robots.txt # \u7F51\u7AD9\u8DDF\u722C\u866B\u95F4\u7684\u534F\u8BAE
\u251C\u2500\u2500 src # \u4E3B\u76EE\u5F55
\u2502   \u251C\u2500\u2500 api # \u63A5\u53E3\u6587\u4EF6
\u2502   \u251C\u2500\u2500 app # redux\u914D\u7F6E\u6587\u4EF6
\u2502   \u251C\u2500\u2500 components # \u516C\u5171\u7EC4\u4EF6
\u2502   \u2502   \u251C\u2500\u2500 Loading # loading\u7EC4\u4EF6
\u2502   \u2502   \u251C\u2500\u2500 Redirect # \u91CD\u5B9A\u5411\u7EC4\u4EF6
\u2502   \u2502   \u2514\u2500\u2500 withAuthorization # \u6743\u9650\u8BA4\u8BC1\u7EC4\u4EF6
\u2502   \u251C\u2500\u2500 layouts # \u4E3B\u8981\u5E03\u5C40\u7EC4\u4EF6
\u2502   \u251C\u2500\u2500 locales # i18n\u56FD\u9645\u5316\u914D\u7F6E
\u2502   \u251C\u2500\u2500 pages # \u8DEF\u7531\u7EC4\u4EF6
\u2502   \u251C\u2500\u2500 routes # \u8DEF\u7531\u914D\u7F6E
\u2502   \u251C\u2500\u2500 styles # \u5168\u5C40/\u516C\u5171\u6837\u5F0F
\u2502   \u251C\u2500\u2500 utils # \u5DE5\u5177\u51FD\u6570
\u2502   \u2502   \u2514\u2500\u2500 http # \u5C01\u88C5\u8BF7\u6C42\u51FD\u6570
\u2502   \u251C\u2500\u2500 App.tsx # App\u7EC4\u4EF6
\u2502   \u251C\u2500\u2500 index.ts # \u4E3B\u5165\u53E3
\u2502   \u251C\u2500\u2500 react-app-env.d.ts # \u7C7B\u578B\u6587\u4EF6\uFF0C\u5728\u7F16\u8BD1\u65F6\u4F1A\u5F15\u5165\u989D\u5916\u6587\u4EF6
\u2502   \u251C\u2500\u2500 reportWebVitals.ts # \u57FA\u4E8EGoogle\u7684\u7F51\u7AD9\u6027\u80FD\u5206\u6790\u6587\u4EF6
\u2502   \u2514\u2500\u2500 setupTests.ts # \u5B89\u88C5\u6D4B\u8BD5
\u251C\u2500\u2500 .env.development # \u5F00\u53D1\u73AF\u5883\u52A0\u8F7D\u7684\u73AF\u5883\u53D8\u91CF\u914D\u7F6E
\u251C\u2500\u2500 .env.production # \u751F\u4EA7\u73AF\u5883\u52A0\u8F7D\u7684\u73AF\u5883\u53D8\u91CF\u914D\u7F6E
\u251C\u2500\u2500 .gitignore # git\u5FFD\u7565\u6587\u4EF6
\u251C\u2500\u2500 craco.config.js # react\u811A\u624B\u67B6\u914D\u7F6E\u6587\u4EF6
\u251C\u2500\u2500 package.json # \u5305\u6587\u4EF6
\u251C\u2500\u2500 README.MD # \u9879\u76EE\u8BF4\u660E\u6587\u4EF6
\u251C\u2500\u2500 tsconfig.extend.json # \u8DEF\u5F84\u522B\u540D\u914D\u7F6E\u6587\u4EF6
\u251C\u2500\u2500 tsconfig.json # ts\u914D\u7F6E\u6587\u4EF6
\u2514\u2500\u2500 yarn.lock # yarn\u4E0B\u8F7D\u5305\u7684\u7F13\u5B58\u6587\u4EF6
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div>`,5);function r(p,l){return e}var b=n(a,[["render",r],["__file","code.html.vue"]]);export{b as default};
