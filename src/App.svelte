<script lang="ts">
	import { onMount } from "svelte";
	import ClipboardJS from "clipboard";
	import hljs from "highlight.js";
	import "highlight.js/styles/github-dark.css";

	import example from "./example";
	import format from "./jss-to-scss";

	let copyButton: HTMLButtonElement;
	let hasCopied = false;
	let scssText = "";
	let scssHtml = "";
	let jssText = "";
	let isClipboardSupported = ClipboardJS.isSupported();
	onMount(() => {
		new ClipboardJS(copyButton);

		jssText = example;
		scssText = format(jssText);
	});

	$: {
		scssText = format(jssText);
		scssHtml = hljs.highlight(scssText, { language: "scss" }).value;
	}

	function focusJssTextaria(e) {
		e.target.select();
	}
	function focusoutJssTextaria() {
		scssText = format(jssText);
	}
	function clickCopyButton(e) {
		hasCopied = true;

		setTimeout(() => {
			hasCopied = false;
		}, 800);
	}
</script>

<div class="flex flex-col min-h-screen overflow-hidden">
	<header class="navbar bg-base-200">
		<div class="navbar-start">&nbsp;</div>
		<div class="navbar-center">
			<h1 class="text-xl font-bold text-gray-300">
				<span class="inline-block bg-[#f0db4f] text-black pl-2 pt-1">JS</span
				><span class="text-white">S</span>
				to
				<span
					class="text-[#cf649a] font-cursive inline-block translate-x-3 translate-y-[0.3rem] scale-[1.8]"
					>Scss</span
				>
			</h1>
		</div>
		<div class="navbar-end">
			<a
				href="https://github.com/lil5/jss-to-scss"
				target="_blank"
				alt="git repository"
				class="border-2 border-gray-700 hover:border-[#F05133] transition-colors rounded-xl py-1 px-2 inline-flex items-center text-gray-100 font-bold group"
				>Fork<span class="ml-1 group-hover:text-[#F05133] icon-fork"
					>&nbsp;</span
				></a
			>
		</div>
	</header>
	<div class="flex flex-col flex-grow">
		<main class="flex flex-col md:flex-row">
			<div class="md:w-1/2 border-t-4 border-[#A39000] relative">
				<textarea
					bind:value={jssText}
					on:focus={focusJssTextaria}
					on:focusout={focusoutJssTextaria}
					spellcheck="false"
					class="w-full h-full bg-base-300 p-4 resize-none outline-0 focus:ring-1 ring-[#A39000] language-ts"
				/>
			</div>

			<div class="md:w-1/2 bg-[#0d1117] border-t-4 border-[#cf649a]">
				<div class="relative">
					<button
						bind:this={copyButton}
						on:click={clickCopyButton}
						alt="copy converted SCSS"
						class={`absolute top-2 right-2 border-2 border-gray-700 hover:border-[#cf649a] rounded-md w-8 h-8 bg-base-200 text-primary-content active:text-[#cf649a] ${
							isClipboardSupported ? "" : "hidden"
						}`}
						data-clipboard-text={scssText}><span class="icon-copy" /></button
					>
					<span
						class={`absolute top-[11px] right-[38px] border-l border-y border-gray-700 bg-base-200 rounded-l px-2 transition-transform ${
							hasCopied ? "" : "translate-x-3 invisible"
						} `}>copied</span
					>
					<pre class="p-4"><code class="bg-[#0d1117] language-scss"
							>{@html scssHtml}</code
						></pre>
				</div>
			</div>
		</main>
		<footer class="p-4">
			<p class="text-center">
				by <b class="text-primary-content">Lucian I. Last</b> made with
				<span class="text-red-400 icon-heart">&nbsp;</span>
				|
				<span alt="copyleft" class="inline-block rotate-180 icon-copyright"
					>&nbsp;</span
				>
				<abbr
					class="underline underline-offset-2"
					title="Mozilla Public License version 2">MPLv2</abbr
				>
			</p>
		</footer>
	</div>
</div>
