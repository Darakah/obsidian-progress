<script>
        import ProgressBar from "@okrad/svelte-progressbar";
        import "font-awesome/css/font-awesome.min.css";
        import { isHexColor } from '../utils'
        export let width = 500;
        export let progressData;
        export let tag;
        export let stateInfo;
        export let title;
        export let showCount = false;
        export let thickness = 10;
        export let style = "bar";

        let mergedData = [];
        Object.keys(progressData).forEach((key) => {
                if (key !== tag) {
                        mergedData.push({
                                perc: Math.round(
                                        (progressData[key] /
                                                progressData[tag]) *
                                                100
                                ),
                                color: isHexColor(stateInfo[key].color) ?  stateInfo[key].color: '#b30202',
                        });
                }
        });

        showCount = showCount === "true" ? true : false;
</script>

<div
        style="width: {width}px;  font-weight: 900; text-align: center; padding-bottom: 3px;"
>
        {title}
</div>

{#if style === "bar"}
        <ProgressBar
                style="thin"
                {width}
                height={thickness}
                valueLabel=" "
                series={mergedData}
        />
{/if}

<div style="width: {width}px; text-align: center;">
        {#each Object.keys(stateInfo) as state}
                <span style="padding-right: 10px;">
                        <i
                                class="fa {stateInfo[state].icon}"
                                aria-hidden="true"
                                style="color: {isHexColor(stateInfo[state].color) ? stateInfo[state].color: '#b30202'};"
                        />
                        {#if showCount}
                                {progressData[state]}
                        {/if}
                        {stateInfo[state].label}
                </span>
        {/each}
</div>
