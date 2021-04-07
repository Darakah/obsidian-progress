import type { TFile, MetadataCache } from 'obsidian';
import { getAllTags } from 'obsidian';

export interface ProgressBarData {
    [key: string]: number;
}

export interface ProgressBarArgs {
    // tag for which to show progress
    tag: string,
    // path regex to search in
    matchPath: string,
    // list of tag states
    tagStates: string,
    // list of colors for tag states
    tagStatesColors: string,
    // list of labels for tag states
    tagStatesLabels: string,
    // list of tag state icons
    tagStatesIcons: string,
    // Progress bar width in pixels
    barWidth: number,
    // container div width %
    divWidth: number,
    // container div align
    divAlign: string,
    // block title
    title: string,
    // Bar Thickness
    thickness: number,
    // Progress Type
    style: string,
    // show or hide counts
    showCount: false;
}

export interface StateInfo {
    [key: string]: {
        color: string,
        label: string,
        icon: string;
    };
}


/**
 * Escape string for use in regex
 * @param string - string to escape 
 */

function escapeRegex(string: string): string {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

/**
 * Return progress data for specified tag
 * @param fileList - obsidian markdown file list
 * @param metadataCache - obsidian metadata cache handler
 * @param data - Progress bar data
 * @param args - block user arguments
 */

export function getProgressData(fileList: TFile[], metadataCache: MetadataCache, data: ProgressBarData, args: ProgressBarArgs): ProgressBarData {

    let reg = new RegExp(`^${escapeRegex(args.matchPath)}\/.*\.md$`);
    if (args.matchPath === '/') {
        reg = new RegExp(`^.*\.md$`);
    }

    for (let file of fileList) {
        if (file.path.match(reg)) {
            let tags = getAllTags(metadataCache.getFileCache(file))?.map(e => e.slice(1, e.length));

            if (!tags.contains(args.tag)) {
                // Count State tags only if Master tag is present
                continue;
            }

            Object.keys(data).forEach(tag => {
                data[tag] += tags.join('').split(tag).length - 1;
            });
        }
    }
    return data;
}

/**
 * Check if string is a valid hexcolor
 */
export const isHexColor = (hex: string): boolean => {
    return typeof hex === 'string'
        && hex.length === 7
        && hex[0] === '#';
};