import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  StatusBar,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CATEGORIAS, FRASES, Categoria, Frase, getFraseDelDia, getFraseAleatoria } from '../data/frases';

const KEY_FAVORITOS = 'favoritos_frases';
const KEY_RACHA = 'racha_frases';
const KEY_ULTIMA_VISITA = 'ultima_visita_frases';

type Tab = 'frases' | 'favoritas' | 'autores';

interface RachaData {
  racha: number;
  ultimaFecha: string;
}

export default function HomeScreen() {
  const [fraseActual, setFraseActual] = useState<Frase>(getFraseDelDia());
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [favoritos, setFavoritos] = useState<number[]>([]);
  const [tab, setTab] = useState<Tab>('frases');
  const [racha, setRacha] = useState(0);
  const [autorSeleccionado, setAutorSeleccionado] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY_FAVORITOS).then(v => { if (v) setFavoritos(JSON.parse(v)); });
    actualizarRacha();
  }, []);

  const actualizarRacha = async () => {
    const hoy = new Date().toDateString();
    const raw = await AsyncStorage.getItem(KEY_RACHA);
    const data: RachaData = raw ? JSON.parse(raw) : { racha: 0, ultimaFecha: '' };

    if (data.ultimaFecha === hoy) {
      setRacha(data.racha);
      return;
    }

    // Verificar si fue ayer
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    const ayerStr = ayer.toDateString();

    const nuevaRacha = data.ultimaFecha === ayerStr ? data.racha + 1 : 1;
    const nuevo: RachaData = { racha: nuevaRacha, ultimaFecha: hoy };
    await AsyncStorage.setItem(KEY_RACHA, JSON.stringify(nuevo));
    setRacha(nuevaRacha);
  };

  const toggleFavorito = async (frase: Frase) => {
    const nuevos = favoritos.includes(frase.id)
      ? favoritos.filter(id => id !== frase.id)
      : [...favoritos, frase.id];
    setFavoritos(nuevos);
    await AsyncStorage.setItem(KEY_FAVORITOS, JSON.stringify(nuevos));
  };

  const esFavorita = favoritos.includes(fraseActual.id);

  const cambiarFrase = (categoria?: Categoria) => {
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    setTimeout(() => {
      setFraseActual(getFraseAleatoria(categoria));
    }, 200);
  };

  const seleccionarCategoria = (cat: Categoria) => {
    const nueva = categoriaSeleccionada === cat ? null : cat;
    setCategoriaSeleccionada(nueva);
    cambiarFrase(nueva || undefined);
  };

  const compartir = async () => {
    try {
      await Share.share({
        message: `"${fraseActual.texto}"\n\n— ${fraseActual.autor}\n\nDescargá Palabras que Inspiran 🙏`,
      });
    } catch (e) {}
  };

  const categoriaActual = CATEGORIAS.find(c => c.id === fraseActual.categoria);
  const frasersFavoritas = FRASES.filter(f => favoritos.includes(f.id));

  // Agrupar por autor
  const autores = Array.from(new Set(FRASES.map(f => f.autor))).sort();
  const frasesPorAutor = autorSeleccionado
    ? FRASES.filter(f => f.autor === autorSeleccionado)
    : [];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Palabras que Inspiran</Text>
          <View style={styles.rachaBadge}>
            <Text style={styles.rachaEmoji}>🔥</Text>
            <Text style={styles.rachaNum}>{racha}</Text>
            <Text style={styles.rachaLabel}>{racha === 1 ? 'día' : 'días'}</Text>
          </View>
        </View>
        <View style={styles.tabsRow}>
          {([
            { key: 'frases', label: '✨ Frases' },
            { key: 'favoritas', label: `❤️ ${favoritos.length > 0 ? `(${favoritos.length})` : 'Favoritas'}` },
            { key: 'autores', label: '✍️ Autores' },
          ] as { key: Tab; label: string }[]).map(t => (
            <TouchableOpacity
              key={t.key}
              style={[styles.tab, tab === t.key && styles.tabActivo]}
              onPress={() => setTab(t.key)}
            >
              <Text style={[styles.tabText, tab === t.key && styles.tabTextActivo]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tab: Frases */}
      {tab === 'frases' && (
        <>
          <Animated.View style={[styles.fraseCard, { opacity: fadeAnim }]}>
            <Text style={styles.categoriaEmoji}>{categoriaActual?.emoji}</Text>
            <Text style={styles.fraseTexto}>"{fraseActual.texto}"</Text>
            <Text style={styles.fraseAutor}>— {fraseActual.autor}</Text>
            <View style={[styles.categoriaBadge, { backgroundColor: categoriaActual?.color + '33' }]}>
              <Text style={[styles.categoriaBadgeText, { color: categoriaActual?.color }]}>
                {categoriaActual?.label}
              </Text>
            </View>
          </Animated.View>

          <View style={styles.accionesRow}>
            <TouchableOpacity
              style={styles.btnNueva}
              onPress={() => cambiarFrase(categoriaSeleccionada || undefined)}
            >
              <Text style={styles.btnNuevaText}>🔄  Nueva</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnFav, esFavorita && styles.btnFavActivo]}
              onPress={() => toggleFavorito(fraseActual)}
            >
              <Text style={styles.btnNuevaText}>{esFavorita ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCompartir} onPress={compartir}>
              <Text style={styles.btnCompartirText}>📤  Compartir</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.categoriasLabel}>Elegí una categoría:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriasScroll}
          >
            {CATEGORIAS.map(cat => {
              const activa = categoriaSeleccionada === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoriaBtn, activa && { backgroundColor: cat.color }]}
                  onPress={() => seleccionarCategoria(cat.id)}
                >
                  <Text style={styles.categoriaEmojiBadge}>{cat.emoji}</Text>
                  <Text style={[styles.categoriaBtnText, activa && styles.categoriaBtnTextActiva]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>{FRASES.length} frases para inspirarte cada día</Text>
          </View>
        </>
      )}

      {/* Tab: Favoritas */}
      {tab === 'favoritas' && (
        <ScrollView contentContainerStyle={styles.favScroll}>
          {frasersFavoritas.length === 0 ? (
            <View style={styles.favVacio}>
              <Text style={styles.favVacioEmoji}>🤍</Text>
              <Text style={styles.favVacioTexto}>Todavía no tenés frases favoritas</Text>
              <Text style={styles.favVacioSub}>Presioná el corazón en cualquier frase para guardarla</Text>
            </View>
          ) : (
            frasersFavoritas.map(f => {
              const cat = CATEGORIAS.find(c => c.id === f.categoria);
              return (
                <View key={f.id} style={[styles.favCard, { borderLeftColor: cat?.color ?? '#7B68EE' }]}>
                  <Text style={styles.favEmoji}>{cat?.emoji}</Text>
                  <Text style={styles.favTexto}>"{f.texto}"</Text>
                  <Text style={styles.favAutor}>— {f.autor}</Text>
                  <TouchableOpacity onPress={() => toggleFavorito(f)} style={styles.favEliminar}>
                    <Text style={styles.favEliminarText}>❤️ Quitar</Text>
                  </TouchableOpacity>
                </View>
              );
            })
          )}
        </ScrollView>
      )}

      {/* Tab: Autores */}
      {tab === 'autores' && (
        <View style={styles.autoresContainer}>
          {!autorSeleccionado ? (
            <ScrollView contentContainerStyle={styles.autoresScroll}>
              <Text style={styles.autoresCount}>{autores.length} autores</Text>
              {autores.map(autor => {
                const frasesCat = FRASES.filter(f => f.autor === autor);
                return (
                  <TouchableOpacity
                    key={autor}
                    style={styles.autorCard}
                    onPress={() => setAutorSeleccionado(autor)}
                  >
                    <Text style={styles.autorNombre}>{autor}</Text>
                    <Text style={styles.autorCount}>{frasesCat.length} frase{frasesCat.length !== 1 ? 's' : ''} →</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.autorBack} onPress={() => setAutorSeleccionado(null)}>
                <Text style={styles.autorBackText}>‹ Todos los autores</Text>
              </TouchableOpacity>
              <Text style={styles.autorTitulo}>✍️ {autorSeleccionado}</Text>
              <ScrollView contentContainerStyle={styles.autoresScroll}>
                {frasesPorAutor.map(f => {
                  const cat = CATEGORIAS.find(c => c.id === f.categoria);
                  const fav = favoritos.includes(f.id);
                  return (
                    <View key={f.id} style={[styles.favCard, { borderLeftColor: cat?.color ?? '#7B68EE' }]}>
                      <View style={styles.favCardHeader}>
                        <Text style={styles.favEmoji}>{cat?.emoji}</Text>
                        <TouchableOpacity onPress={() => toggleFavorito(f)}>
                          <Text style={{ fontSize: 20 }}>{fav ? '❤️' : '🤍'}</Text>
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.favTexto}>"{f.texto}"</Text>
                      <View style={[styles.categoriaBadge, { backgroundColor: cat?.color + '33', alignSelf: 'flex-start' }]}>
                        <Text style={[styles.categoriaBadgeText, { color: cat?.color }]}>{cat?.label}</Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a2e' },
  header: { paddingTop: 52, paddingBottom: 12, paddingHorizontal: 16 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#ffffff', letterSpacing: 0.5 },
  rachaBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FF8C0022', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 6,
    borderWidth: 1, borderColor: '#FF8C00',
  },
  rachaEmoji: { fontSize: 14 },
  rachaNum: { color: '#FF8C00', fontWeight: '900', fontSize: 16 },
  rachaLabel: { color: '#FF8C00', fontSize: 11 },
  tabsRow: { flexDirection: 'row', backgroundColor: '#0f0f1e', borderRadius: 24, padding: 3 },
  tab: { flex: 1, paddingVertical: 8, borderRadius: 20, alignItems: 'center' },
  tabActivo: { backgroundColor: '#533483' },
  tabText: { color: '#888', fontSize: 12, fontWeight: '600' },
  tabTextActivo: { color: '#fff' },

  fraseCard: {
    marginHorizontal: 16, marginVertical: 14,
    backgroundColor: '#16213e', borderRadius: 20, padding: 24,
    alignItems: 'center', minHeight: 200, justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8,
  },
  categoriaEmoji: { fontSize: 38, marginBottom: 14 },
  fraseTexto: { fontSize: 18, color: '#e8e8f0', textAlign: 'center', lineHeight: 28, fontStyle: 'italic' },
  fraseAutor: { fontSize: 14, color: '#8888aa', marginTop: 14, fontWeight: '500' },
  categoriaBadge: { marginTop: 12, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  categoriaBadgeText: { fontSize: 13, fontWeight: '600' },

  accionesRow: { flexDirection: 'row', marginHorizontal: 16, gap: 10 },
  btnNueva: { flex: 1, backgroundColor: '#0f3460', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  btnNuevaText: { color: '#fff', fontSize: 15, fontWeight: '600' },
  btnFav: { width: 50, backgroundColor: '#1a1a3e', paddingVertical: 14, borderRadius: 14, alignItems: 'center', borderWidth: 1, borderColor: '#3a3a5e' },
  btnFavActivo: { backgroundColor: '#4a1a2e', borderColor: '#E74C3C' },
  btnCompartir: { flex: 1, backgroundColor: '#533483', paddingVertical: 14, borderRadius: 14, alignItems: 'center' },
  btnCompartirText: { color: '#fff', fontSize: 15, fontWeight: '600' },

  categoriasLabel: { color: '#a0a0c0', fontSize: 14, marginLeft: 16, marginTop: 20, marginBottom: 8 },
  categoriasScroll: { paddingHorizontal: 16, gap: 8 },
  categoriaBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#16213e', paddingHorizontal: 16, paddingVertical: 10,
    borderRadius: 30, borderWidth: 1, borderColor: '#2a2a4a',
  },
  categoriaEmojiBadge: { fontSize: 16 },
  categoriaBtnText: { color: '#a0a0c0', fontSize: 14, fontWeight: '500' },
  categoriaBtnTextActiva: { color: '#fff', fontWeight: '700' },
  footer: { alignItems: 'center', paddingVertical: 16, marginTop: 'auto' },
  footerText: { color: '#555577', fontSize: 12 },

  favScroll: { padding: 16, paddingBottom: 40 },
  favVacio: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 30 },
  favVacioEmoji: { fontSize: 60, marginBottom: 16 },
  favVacioTexto: { color: '#ccc', fontSize: 17, fontWeight: '600', textAlign: 'center', marginBottom: 8 },
  favVacioSub: { color: '#777', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  favCard: { backgroundColor: '#16213e', borderRadius: 16, padding: 18, marginBottom: 12, borderLeftWidth: 4 },
  favCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  favEmoji: { fontSize: 26, marginBottom: 8 },
  favTexto: { color: '#e8e8f0', fontSize: 16, fontStyle: 'italic', lineHeight: 24, marginBottom: 8 },
  favAutor: { color: '#888', fontSize: 13, marginBottom: 8 },
  favEliminar: { alignSelf: 'flex-start' },
  favEliminarText: { color: '#E74C3C', fontSize: 12, fontWeight: '600' },

  autoresContainer: { flex: 1 },
  autoresScroll: { padding: 16, paddingBottom: 40 },
  autoresCount: { color: '#888', fontSize: 13, marginBottom: 12 },
  autorCard: {
    backgroundColor: '#16213e', borderRadius: 14, padding: 14,
    marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderWidth: 1, borderColor: '#2a2a4a',
  },
  autorNombre: { color: '#ddd', fontSize: 15, fontWeight: '600', flex: 1 },
  autorCount: { color: '#7B68EE', fontSize: 13, fontWeight: '600' },
  autorBack: { paddingHorizontal: 16, paddingVertical: 12 },
  autorBackText: { color: '#7B68EE', fontSize: 15, fontWeight: '600' },
  autorTitulo: { color: '#fff', fontSize: 18, fontWeight: '700', paddingHorizontal: 16, marginBottom: 8 },
});
