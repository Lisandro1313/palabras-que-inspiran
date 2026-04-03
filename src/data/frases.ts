export type Categoria = 'fe' | 'vida' | 'familia' | 'naturaleza' | 'salud' | 'amistad';

export interface Frase {
  id: number;
  texto: string;
  autor: string;
  categoria: Categoria;
}

export const CATEGORIAS: { id: Categoria; label: string; emoji: string; color: string }[] = [
  { id: 'fe', label: 'Fe', emoji: '🙏', color: '#7B68EE' },
  { id: 'vida', label: 'Vida', emoji: '✨', color: '#FF8C00' },
  { id: 'familia', label: 'Familia', emoji: '❤️', color: '#E74C3C' },
  { id: 'naturaleza', label: 'Naturaleza', emoji: '🌿', color: '#27AE60' },
  { id: 'salud', label: 'Salud', emoji: '💪', color: '#3498DB' },
  { id: 'amistad', label: 'Amistad', emoji: '🤝', color: '#F39C12' },
];

export const FRASES: Frase[] = [
  // FE
  { id: 1, texto: 'La fe no es creer que Dios puede, es saber que Dios lo hará.', autor: 'Anónimo', categoria: 'fe' },
  { id: 2, texto: 'Donde hay fe, hay amor. Donde hay amor, hay paz.', autor: 'Anónimo', categoria: 'fe' },
  { id: 3, texto: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.', autor: 'Isaías 41:10', categoria: 'fe' },
  { id: 4, texto: 'La oración es la llave de la mañana y el cerrojo de la noche.', autor: 'Mahatma Gandhi', categoria: 'fe' },
  { id: 5, texto: 'Con Dios todo es posible.', autor: 'Mateo 19:26', categoria: 'fe' },
  { id: 6, texto: 'La fe mueve montañas, pero también mueve el corazón.', autor: 'Anónimo', categoria: 'fe' },
  { id: 7, texto: 'Confía en el Señor con todo tu corazón y no te apoyes en tu propia prudencia.', autor: 'Proverbios 3:5', categoria: 'fe' },
  { id: 8, texto: 'La fe es dar el primer paso aun cuando no puedas ver toda la escalera.', autor: 'Martin Luther King', categoria: 'fe' },
  { id: 9, texto: 'Dios nunca cierra una puerta sin abrir una ventana.', autor: 'Anónimo', categoria: 'fe' },
  { id: 10, texto: 'La paz de Dios sobrepasa todo entendimiento.', autor: 'Filipenses 4:7', categoria: 'fe' },
  { id: 11, texto: 'Cada amanecer es un regalo de Dios para comenzar de nuevo.', autor: 'Anónimo', categoria: 'fe' },
  { id: 12, texto: 'El que tiene fe tiene todo; el que carece de fe carece de todo.', autor: 'Anónimo', categoria: 'fe' },
  { id: 13, texto: 'Señor, dame la serenidad para aceptar lo que no puedo cambiar.', autor: 'Reinhold Niebuhr', categoria: 'fe' },
  { id: 14, texto: 'Todo lo puedo en Cristo que me fortalece.', autor: 'Filipenses 4:13', categoria: 'fe' },
  { id: 15, texto: 'La gratitud es la memoria del corazón.', autor: 'Jean Baptiste Massieu', categoria: 'fe' },

  // VIDA
  { id: 16, texto: 'Cada día es una nueva oportunidad para ser mejor.', autor: 'Anónimo', categoria: 'vida' },
  { id: 17, texto: 'La vida no se mide por los años, sino por los momentos que nos quitan el aliento.', autor: 'Anónimo', categoria: 'vida' },
  { id: 18, texto: 'No esperes a ser perfecto para comenzar a vivir.', autor: 'Anónimo', categoria: 'vida' },
  { id: 19, texto: 'La felicidad no es un destino, es una manera de viajar.', autor: 'Margueritte Bro', categoria: 'vida' },
  { id: 20, texto: 'Hoy es el primer día del resto de tu vida.', autor: 'Anónimo', categoria: 'vida' },
  { id: 21, texto: 'La vida es lo que pasa mientras estás ocupado haciendo otros planes.', autor: 'John Lennon', categoria: 'vida' },
  { id: 22, texto: 'Sonríe, porque cada día es una bendición.', autor: 'Anónimo', categoria: 'vida' },
  { id: 23, texto: 'La mejor manera de predecir tu futuro es crearlo.', autor: 'Abraham Lincoln', categoria: 'vida' },
  { id: 24, texto: 'Vive como si fuera el último día, aprende como si fueras a vivir siempre.', autor: 'Mahatma Gandhi', categoria: 'vida' },
  { id: 25, texto: 'No llores porque terminó, sonríe porque sucedió.', autor: 'Gabriel García Márquez', categoria: 'vida' },
  { id: 26, texto: 'La vida es demasiado corta para despertarse por la mañana con arrepentimientos.', autor: 'Anónimo', categoria: 'vida' },
  { id: 27, texto: 'Cada arruga cuenta una historia de vida vivida con plenitud.', autor: 'Anónimo', categoria: 'vida' },
  { id: 28, texto: 'La experiencia es el maestro más sabio.', autor: 'Julio César', categoria: 'vida' },
  { id: 29, texto: 'Los años no nos hacen viejos, nos hacen sabios.', autor: 'Anónimo', categoria: 'vida' },
  { id: 30, texto: 'Un día a la vez, esa es la clave.', autor: 'Anónimo', categoria: 'vida' },
  { id: 31, texto: 'La alegría es la señal más infalible del amor de Dios en el corazón.', autor: 'León Bloy', categoria: 'vida' },
  { id: 32, texto: 'Nunca es tarde para ser lo que podrías haber sido.', autor: 'George Eliot', categoria: 'vida' },
  { id: 33, texto: 'La vida empieza donde termina el miedo.', autor: 'Osho', categoria: 'vida' },
  { id: 34, texto: 'Sé el cambio que quieres ver en el mundo.', autor: 'Mahatma Gandhi', categoria: 'vida' },
  { id: 35, texto: 'El secreto de la vida no es hacer lo que uno quiere, sino querer lo que uno hace.', autor: 'Anónimo', categoria: 'vida' },

  // FAMILIA
  { id: 36, texto: 'La familia es el primer lugar donde aprendemos a amar.', autor: 'Anónimo', categoria: 'familia' },
  { id: 37, texto: 'Un hogar lleno de amor es el más rico del mundo.', autor: 'Anónimo', categoria: 'familia' },
  { id: 38, texto: 'La familia no es algo importante, es todo.', autor: 'Michael J. Fox', categoria: 'familia' },
  { id: 39, texto: 'Los abuelos son el corazón de la familia.', autor: 'Anónimo', categoria: 'familia' },
  { id: 40, texto: 'En familia, las cargas se hacen más livianas y las alegrías se multiplican.', autor: 'Anónimo', categoria: 'familia' },
  { id: 41, texto: 'El amor de una madre es la fuerza más poderosa del mundo.', autor: 'Anónimo', categoria: 'familia' },
  { id: 42, texto: 'La familia es donde la vida comienza y el amor nunca termina.', autor: 'Anónimo', categoria: 'familia' },
  { id: 43, texto: 'Los hijos son la mayor bendición que Dios puede dar.', autor: 'Anónimo', categoria: 'familia' },
  { id: 44, texto: 'Ser abuelo es la mejor recompensa de haber sido buen padre.', autor: 'Anónimo', categoria: 'familia' },
  { id: 45, texto: 'La familia que ora unida, permanece unida.', autor: 'Patrick Peyton', categoria: 'familia' },
  { id: 46, texto: 'Honra a tu padre y a tu madre para que te vaya bien.', autor: 'Éxodo 20:12', categoria: 'familia' },
  { id: 47, texto: 'El amor familiar es incondicional e indestructible.', autor: 'Anónimo', categoria: 'familia' },
  { id: 48, texto: 'Los recuerdos compartidos en familia son el tesoro más valioso.', autor: 'Anónimo', categoria: 'familia' },
  { id: 49, texto: 'Una sonrisa de tu hijo vale más que todo el oro del mundo.', autor: 'Anónimo', categoria: 'familia' },
  { id: 50, texto: 'La mesa familiar es el altar del hogar.', autor: 'Anónimo', categoria: 'familia' },

  // NATURALEZA
  { id: 51, texto: 'La naturaleza es el arte de Dios.', autor: 'Dante Alighieri', categoria: 'naturaleza' },
  { id: 52, texto: 'En cada flor hay un milagro.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 53, texto: 'Después de la lluvia, siempre sale el sol.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 54, texto: 'El árbol que da más frutos es el que más se inclina.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 55, texto: 'Contemplar la naturaleza es rezar sin palabras.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 56, texto: 'El amanecer nos recuerda que cada día trae nuevas esperanzas.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 57, texto: 'Las estrellas brillan más en la oscuridad.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 58, texto: 'La tierra ríe en flores.', autor: 'Ralph Waldo Emerson', categoria: 'naturaleza' },
  { id: 59, texto: 'El agua dulce del río nunca olvida de dónde viene.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 60, texto: 'Un jardín es un amigo que siempre está disponible.', autor: 'Kinza Nambudiripad', categoria: 'naturaleza' },
  { id: 61, texto: 'Las mariposas son flores que aprendieron a volar.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 62, texto: 'Cuida la naturaleza y ella cuidará de ti.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 63, texto: 'En el silencio de la naturaleza, Dios habla más fuerte.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 64, texto: 'El sol sale para todos sin pedir nada a cambio.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 65, texto: 'Las semillas pequeñas se convierten en los árboles más grandes.', autor: 'Anónimo', categoria: 'naturaleza' },

  // SALUD
  { id: 66, texto: 'La salud es la mayor riqueza.', autor: 'Virgilio', categoria: 'salud' },
  { id: 67, texto: 'Mente sana en cuerpo sano.', autor: 'Juvenal', categoria: 'salud' },
  { id: 68, texto: 'El mejor médico es el que nos enseña a cuidarnos solos.', autor: 'Anónimo', categoria: 'salud' },
  { id: 69, texto: 'La alegría es la mejor medicina para el cuerpo y el alma.', autor: 'Anónimo', categoria: 'salud' },
  { id: 70, texto: 'Caminar es la mejor terapia que existe.', autor: 'Hipócrates', categoria: 'salud' },
  { id: 71, texto: 'Una buena carcajada y un largo sueño son las dos mejores curas.', autor: 'Proverbio Irlandés', categoria: 'salud' },
  { id: 72, texto: 'El cuerpo agradece el descanso tanto como el movimiento.', autor: 'Anónimo', categoria: 'salud' },
  { id: 73, texto: 'Cuídate hoy para poder cuidar a otros mañana.', autor: 'Anónimo', categoria: 'salud' },
  { id: 74, texto: 'La paz mental es la base de toda salud.', autor: 'Anónimo', categoria: 'salud' },
  { id: 75, texto: 'Come bien, duerme bien, y el resto vendrá solo.', autor: 'Anónimo', categoria: 'salud' },
  { id: 76, texto: 'El que tiene salud tiene esperanza; el que tiene esperanza lo tiene todo.', autor: 'Proverbio Árabe', categoria: 'salud' },
  { id: 77, texto: 'Un vaso de agua fresca en la mañana es el mejor comienzo del día.', autor: 'Anónimo', categoria: 'salud' },
  { id: 78, texto: 'Escucha a tu cuerpo, él sabe lo que necesita.', autor: 'Anónimo', categoria: 'salud' },
  { id: 79, texto: 'La gratitud sana el corazón más rápido que cualquier medicina.', autor: 'Anónimo', categoria: 'salud' },
  { id: 80, texto: 'Cada paso que das es un regalo para tu corazón.', autor: 'Anónimo', categoria: 'salud' },

  // AMISTAD
  { id: 81, texto: 'Un amigo es alguien que conoce tu historia y aun así te quiere.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 82, texto: 'La amistad es el único cemento que puede mantener unido al mundo.', autor: 'Woodrow Wilson', categoria: 'amistad' },
  { id: 83, texto: 'Un buen amigo vale más que cien conocidos.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 84, texto: 'Los amigos son la familia que uno elige.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 85, texto: 'La verdadera amistad no se oxida con el tiempo.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 86, texto: 'Un amigo fiel es una medicina de vida.', autor: 'Eclesiástico 6:16', categoria: 'amistad' },
  { id: 87, texto: 'La amistad duplica las alegrías y divide las angustias.', autor: 'Francis Bacon', categoria: 'amistad' },
  { id: 88, texto: 'El mejor espejo es un amigo viejo.', autor: 'Proverbio Inglés', categoria: 'amistad' },
  { id: 89, texto: 'En la adversidad conocemos a los verdaderos amigos.', autor: 'Aristóteles', categoria: 'amistad' },
  { id: 90, texto: 'No hay camino largo para quien va acompañado de un buen amigo.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 91, texto: 'Una llamada de un amigo puede cambiar el día entero.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 92, texto: 'Los amigos son el sol en los días nublados.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 93, texto: 'Haz el bien sin mirar a quién y tendrás amigos para siempre.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 94, texto: 'La amistad es ese abrazo que no necesita distancia.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 95, texto: 'Con un amigo al lado, cualquier camino se hace corto.', autor: 'Anónimo', categoria: 'amistad' },

  // SEGUNDA RONDA - más frases
  { id: 96, texto: 'Cada mañana es una nueva página en blanco, escríbela bien.', autor: 'Anónimo', categoria: 'vida' },
  { id: 97, texto: 'La paciencia es la llave de la alegría.', autor: 'Proverbio Árabe', categoria: 'vida' },
  { id: 98, texto: 'No importa cuán lento vayas, siempre que no te detengas.', autor: 'Confucio', categoria: 'vida' },
  { id: 99, texto: 'La esperanza es el sueño del que está despierto.', autor: 'Aristóteles', categoria: 'fe' },
  { id: 100, texto: 'Donde hay amor, hay vida.', autor: 'Mahatma Gandhi', categoria: 'familia' },
  { id: 101, texto: 'El corazón que ama siempre es joven.', autor: 'Proverbio Griego', categoria: 'vida' },
  { id: 102, texto: 'La bondad es el lenguaje que los sordos pueden oír y los ciegos ver.', autor: 'Mark Twain', categoria: 'vida' },
  { id: 103, texto: 'Cada persona que encuentras sabe algo que tú no sabes.', autor: 'Bill Nye', categoria: 'vida' },
  { id: 104, texto: 'El tiempo que disfrutas perdiendo no es tiempo perdido.', autor: 'Bertrand Russell', categoria: 'vida' },
  { id: 105, texto: 'La sabiduría comienza en la maravilla.', autor: 'Sócrates', categoria: 'vida' },
  { id: 106, texto: 'No hay mejor ejercicio para el corazón que agacharse para ayudar a alguien.', autor: 'John Andrew Holmes', categoria: 'salud' },
  { id: 107, texto: 'El perdón es el regalo más grande que puedes darte a ti mismo.', autor: 'Anónimo', categoria: 'fe' },
  { id: 108, texto: 'Los sueños no caducan, siempre es tiempo de volver a ellos.', autor: 'Anónimo', categoria: 'vida' },
  { id: 109, texto: 'La vida sin amor es como un árbol sin flores ni frutos.', autor: 'Khalil Gibran', categoria: 'familia' },
  { id: 110, texto: 'Comparte tu felicidad, se multiplicará.', autor: 'Anónimo', categoria: 'amistad' },
  { id: 111, texto: 'La vejez es una corona de dignidad.', autor: 'Anónimo', categoria: 'vida' },
  { id: 112, texto: 'Los que siembran con lágrimas, con alegría segarán.', autor: 'Salmos 126:5', categoria: 'fe' },
  { id: 113, texto: 'La gratitud transforma lo que tenemos en suficiente.', autor: 'Anónimo', categoria: 'vida' },
  { id: 114, texto: 'Una sonrisa es la curva más bonita del cuerpo humano.', autor: 'Anónimo', categoria: 'salud' },
  { id: 115, texto: 'El amor no se ve con los ojos, sino con el corazón.', autor: 'William Shakespeare', categoria: 'familia' },
  { id: 116, texto: 'Los ríos más tranquilos son los más profundos.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 117, texto: 'Recuerda que el presente siempre será un recuerdo.', autor: 'Anónimo', categoria: 'vida' },
  { id: 118, texto: 'No dejes para mañana la ternura que puedes dar hoy.', autor: 'Anónimo', categoria: 'familia' },
  { id: 119, texto: 'La primavera siempre llega después del invierno.', autor: 'Anónimo', categoria: 'naturaleza' },
  { id: 120, texto: 'El que madruga, Dios lo ayuda.', autor: 'Proverbio Popular', categoria: 'fe' },
];

export function getFraseDelDia(): Frase {
  const hoy = new Date();
  const indice = (hoy.getFullYear() * 365 + hoy.getMonth() * 30 + hoy.getDate()) % FRASES.length;
  return FRASES[indice];
}

export function getFrasesPorCategoria(categoria: Categoria): Frase[] {
  return FRASES.filter(f => f.categoria === categoria);
}

export function getFraseAleatoria(categoria?: Categoria): Frase {
  const lista = categoria ? getFrasesPorCategoria(categoria) : FRASES;
  return lista[Math.floor(Math.random() * lista.length)];
}
