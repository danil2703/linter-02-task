function lintGrid(content, string, gridSize, errors, data) {
    let marketing = 0;
    const marketingBlocks = ['commercial', 'offer'];
    content.forEach((item) => {
        if (item.elem === 'fraction' && item.elemMods) {
            if (marketingBlocks.includes(item.content[0].block)) {
                marketing += +item.elemMods['m-col'];
            }
        }
    });
    if (marketing > gridSize / 2) {
        const message = "Маркетинговые блоки не могут занимать больше половины от всех колонок блока grid";
        const code = "GRID.TOO_MUCH_MARKETING_BLOCKS";
        findErrors(string, data.str, code, message, errors);
    }
}
