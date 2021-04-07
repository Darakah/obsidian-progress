import type { TFile, MetadataCache } from 'obsidian';
import type { ProgressBarArgs, ProgressBarData, StateInfo } from './utils';
import { getProgressData } from './utils';
import Progress from './svelte/Progress.svelte';

/**
 * Sorted array based on index
 */
const unique = (value: string, index: number, self: string[]) => {
	return self.indexOf(value) === index;
};

export class ProgressProcessor {

	async run(source: string, el: HTMLElement, fileList: TFile[], metadataCache: MetadataCache) {

		let args: ProgressBarArgs = {
			tag: '',
			matchPath: '.*',
			tagStates: '',
			tagStatesColors: '',
			tagStatesLabels: '',
			tagStatesIcons: '',
			barWidth: 500,
			divWidth: 50,
			divAlign: 'left',
			title: '',
			showCount: false,
			style: 'thin',
			thickness: 10
		};

		source.split('\n').map(e => {
			if (e) {
				let param = e.trim().split('=');
				(args as any)[param[0]] = param[1]?.trim();
			}
		});

		let elCanvas = el.createDiv({
			cls: 'obsidian-progress-block',
			attr: { 'style': `width: ${args.divWidth}%; height: auto; float: ${args.divAlign}` }
		});

		// no progress tag specified
		if (!args.tag || args.tag.trim().length === 0) {
			elCanvas.setText('No Progress tag specified!');
			return;
		}

		let tagStatesColors = args.tagStatesColors.split(';').map(tag => tag.trim()).filter(e => e !== "");
		let tagStatesLabels = args.tagStatesLabels.split(';').map(label => label.trim()).filter(e => e !== "");
		let tagStatesIcons = args.tagStatesIcons.split(';').map(label => label.trim()).filter(e => e !== "");
		let tagStates = args.tagStates.split(';').map(tag => tag.trim()).filter(e => e !== "").filter(unique);

		// no states specified
		if (!tagStates) {
			elCanvas.setText('No Progress States specified!');
			return;
		}

		// Create State colors dictionary
		let StateInfo: StateInfo = {};

		tagStates.forEach(state => {
			let index = tagStates.indexOf(state);
			StateInfo[state] = {
				color: tagStatesColors[index] ?? 'red',
				label: tagStatesLabels[index] ?? '--',
				icon: tagStatesIcons[index] ?? 'fa-circle'
			};
		});

		// Initialize progress data
		let progressData: ProgressBarData = {};
		progressData[args.tag] = 0;
		tagStates.forEach(tagState => {
			progressData[tagState] = 0;
		});

		// Get progress data for specified tags
		progressData = getProgressData(fileList, metadataCache, progressData, args);

		// Check if selected tag exists at least once
		if (progressData[args.tag] === 0) {
			elCanvas.setText('Selected tag not found!');
			return;
		}

		new Progress({
			props: {
				progressData: progressData,
				tag: args.tag,
				stateInfo: StateInfo,
				width: args.barWidth,
				title: args.title,
				showCount: args.showCount,
				thickness: args.thickness,
				style: args.style
			},
			target: elCanvas
		});
	}
}