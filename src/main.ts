import { Plugin } from 'obsidian';
import { ProgressProcessor } from './block';

export default class ProgressPlugin extends Plugin {
	containerEl: HTMLElement;

	async onload() {
		// Load message
		console.log('Loaded Progress Plugin');

		// Register progress block renderer
		this.registerMarkdownCodeBlockProcessor('progress', async (source, el, ctx) => {
			const proc = new ProgressProcessor();
			await proc.run(source, el, this.app.vault.getMarkdownFiles(), this.app.metadataCache);
		});
	}

	onunload() {
		console.log('unloading Progress Plugin');
	}
}
