document.addEventListener("DOMContentLoaded", ()=>{
    const App = require("./App");

    if(window.innerWidth > 800) {
        const app = new App();
        // app.makeScene();
    } else {
        document.write("Mobile version is not available");
    }
});
