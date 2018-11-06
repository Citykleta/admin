"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const meta_1 = require("../partials/meta");
exports.page = (props = {}) => `<html>
<head>
    ${meta_1.meta(props)}
    <link rel="preload" as="style" href="public/theme/table.css" />
    <link rel="stylesheet" href="public/theme/table.css" />
    <link rel="stylesheet" type="text/css" href="public/theme/main.css" />
    <script async="true" type="module" src="public/js/index.js"></script>
</head>
<body>
    <header id="main-header">
        <span id="logo">#CityKleta</span>
        <nav class="">
            <ul>
                <li><a href="/users" data-navigo>Users</a></li>    
                <li><a href="/roles" data-navigo>Roles</a></li>    
                <li><a href="/applications" data-navigo>Applications</a></li>    
                <li><a href="/bikes" data-navigo>Bikes</a></li>    
                <li><a href="/businesses" data-navigo>Businesses</a></li>    
                <li><a href="/logout">Log out</a></li>    
            </ul>    
        </nav>
    </header>
    <main class="page-centered">
        <div class="loading">Loading...</div>
    </main>
    <footer>Citykleta Copyrights</footer>
</body>
</html>`;
