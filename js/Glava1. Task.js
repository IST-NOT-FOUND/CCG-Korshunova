window.onload=function(){
    var camera, scene, renderer;
    var geometry, material, mesh;

    init();
    animate();
    // инициализация начальных значений
    function init() {
        // создаем камеру - перспективная проекция
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
        // установка z-координаты камеры
        camera.position.z = 600;
        // настройка сцены
        scene = new THREE.Scene();
        // настройка геометрии - в качестве геометрии будет куб
        // настроим его ширину, высоту и длину по оси z
        geometry = new THREE.CubeGeometry(200, 200, 200);
        // настройка материала - установка цвета
        material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
        // настраиваем меш, который будет отображать куб
        mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // создаем объект для рендеринга сцены
        renderer = new THREE.WebGLRenderer();
        // установка размеров
        renderer.setSize(window.innerWidth, window.innerHeight);
        // встраиваем в DOM-структуру страницы
        document.body.appendChild(renderer.domElement);
    }
    // функция анимации
    function animate() {

        requestAnimationFrame(animate);
        // вращение меша вокруг осей
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        // рендеринг сцены - метод, производящий по сути отрисовку
        renderer.render(scene, camera);
    }
}
function init1() {
    // создаем камеру - перспективная проекция
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    // установка z-координаты камеры
    camera.position.z = 600;
    // настройка сцены
    scene = new THREE.Scene();
    // настройка геометрии - в качестве геометрии будет куб
    // настроим его ширину, высоту и длину по оси z
    geometry = new THREE.SphereGeometry(200, 32, 32);
    // настройка материала - установка цвета
    material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true});
    // настраиваем меш, который будет отображать шар
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // создаем объект для рендеринга сцены
    renderer = new THREE.WebGLRenderer();
    // установка размеров
    renderer.setSize(window.innerWidth, window.innerHeight);
    // встраиваем в DOM-структуру страницы
    document.body.appendChild(renderer.domElement);
}
function Sphere() {
    init1();
    animate();
}