const apiManager = new ApiManager();
const renderer = new Renderer();

$("button").click(function() {
    renderRandomData();
});

async function renderRandomData() {
    const data = await apiManager.getRandomData();
    renderer.render(data);
}

renderRandomData();