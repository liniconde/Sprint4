// URL DE MI CHISTE//
const url_chiste = "https://icanhazdadjoke.com/";
const url_chistechuck = "https://api.chucknorris.io/jokes/random";
const url_clima =
  "https://api.openweathermap.org/data/2.5/weather?lat=41.418109927968686&lon=1.9654498050175224&appid=16cb1d0f3ea07a2bc3e832c78f7fdb77";

//llamados de mis elementos en HTML //
const p = document.getElementById("chiste");
const main = document.getElementById("main");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const icono = document.getElementById("icono") as HTMLImageElement;
const fondo = document.getElementById("fondo") as HTMLImageElement;
const fondo1 = document.getElementById("fondo1") as HTMLImageElement;
const fondo2 = document.getElementById("fondo2") as HTMLImageElement;

interface IChisteActual {
  id: string;
  chiste: string;
}

let chisteActual: IChisteActual = {
  id: "",
  chiste: "",
};

interface IReporteChiste {
  id: string;
  chiste: string;
  score: number;
  date: string;
}

let reporteChiste: Array<IReporteChiste> = [];

function asignarScore(score: number) {
  const resportUser: IReporteChiste = {
    id: chisteActual.id,
    chiste: chisteActual.chiste,
    date: new Date().toISOString(),
    score: score,
  };

  const index = reporteChiste.findIndex(
    (chiste) => chiste.id === chisteActual.id
  );

  if (index == -1) {
    reporteChiste.push(resportUser);
  } else {
    reporteChiste[index].score = score;
  }

  console.log(reporteChiste);
}

function añadirChistEstado(chiste: IChisteActual) {
  chisteActual.id = chiste.id;
  chisteActual.chiste = chiste.chiste;
}

async function TraerChiste() {
  const respone = await fetch(url_chiste, {
    headers: { Accept: "application/json" },
  });
  const chiste = await respone.json();

  const chisteTransformado: IChisteActual = {
    id: chiste.id,
    chiste: chiste.joke,
  };

  return chisteTransformado;
}

async function TraerChisteChuck() {
  const respusta2 = await fetch(url_chistechuck, {
    headers: { Accept: "application/json" },
  });
  const chiste = await respusta2.json();

  const chisteTransformado: IChisteActual = {
    id: chiste.id,
    chiste: chiste.value,
  };

  return chisteTransformado;
}

async function TraerClima() {
  const response = await fetch(url_clima);

  const clima = await response.json();


  const climaTransformado = {
    temp: Math.floor(clima.main.temp - 273.15),
    icono: clima.weather[0].icon,
    description: clima.weather[0].description,
    main: clima.weather[0].main,
  };
  return climaTransformado;
}

/* Ejemplo para guiarme que se puede hacer la converción con una función
function calculargrados(temp:number){
    return Math.floor(temp - 273.15);*/
    

async function printClima() {
  const clima = await TraerClima();

  if (icono && temp && main && description) {
    icono.src = `https://openweathermap.org/img/wn/${clima.icono}.png`;
    temp.textContent = clima.temp + " ºC";
    main.textContent = clima.main;
    description.textContent = clima.description;
  }
}

function printChiste(chisteActual: IChisteActual) {
  if (p) {
    p.textContent = chisteActual.chiste;
  }
}

function random() {
  return Math.floor(Math.random() * 2);
}

async function botonsiguiente() {
  const randonApi = random();
  if (randonApi === 0) {
    const nuevoChiste = await TraerChiste();
    añadirChistEstado(nuevoChiste);
    printChiste(chisteActual);
  }

  if (randonApi === 1) {
    const nuevoChiste = await TraerChisteChuck();
    añadirChistEstado(nuevoChiste);
    printChiste(chisteActual);
  }

  if (fondo && fondo1 && fondo2) {
    const ruta = randombg();
    fondo.src = ruta;
    fondo1.src = ruta;
    fondo2.src = ruta;
  }
}

function randombg(): string {
  const number = Math.floor(Math.random() * 4);
  return `./imagenes/C${number}.png`;
}

async function init() {
  const respuestaChiste = await TraerChiste();
  añadirChistEstado(respuestaChiste);
  printChiste(chisteActual);
  printClima();
}

init();
