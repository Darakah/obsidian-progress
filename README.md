# Obsidian Progress

[Obsidian](https://obsidian.md/) plugin to create customizable progress displays for whole vault or specific project using tags.

## Example
![](https://raw.githubusercontent.com/Darakah/obsidian-progress/main/images/Example_1.gif)

## Usage
- Render block with block id `progress`
- Block Content Example:

```
tag=Issue
matchPath=/
tagStates=Open;Closed
tagStatesColors=#ff0000;#4cb302
tagStatesLabels=Closed;Open
tagStatesIcons=fa-times-circle;fa-exclamation-circle
showCount=true
divAlign=left
divWidth=50
barWidth=300
title=Issues
thickness=10
style=bar
```

- Only `bar` style available for first release
- `tag` tag to quantify for example `Issue` to count `#Issue`
- `tagStates` tag modifiers for the main tag specified, separated by `;` for example `Open;Closed` to count `#Open` and `#Closed`
- `divAlign` can be `left` or `right`
- `divWidth` in % 
- `barWidth` in px
- `tagStatesIcons` list of https://fontawesome.com/v4.7.0/icons/
- `tagStatesColors` only HEX COLORS ALLOWED

![](https://raw.githubusercontent.com/Darakah/obsidian-progress/main/images/Example_2.png)

## Release Notes

### v0.0.1
- Initial release


## Support

[![Github Sponsorship](https://raw.githubusercontent.com/Darakah/Darakah/e0fe245eaef23cb4a5f19fe9a09a9df0c0cdc8e1/icons/github_sponsor_btn.svg)](https://github.com/sponsors/Darakah) [<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="BuyMeACoffee" width="100">](https://www.buymeacoffee.com/darakah)
