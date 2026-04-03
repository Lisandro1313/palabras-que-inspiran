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
import { CATEGORIAS, FRASES, Categoria, Frase, getFraseDelDia, getFraseAleatoria } from '../data/frases';

export default function HomeScreen() {
  const [fraseActual, setFraseActual] = useState<Frase>(getFraseDelDia());
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<Categoria | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a2e" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Palabras que Inspiran</Text>
        <Text style={styles.headerSubtitle}>Tu frase de cada día</Text>
      </View>

      {/* Frase principal */}
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

      {/* Botones acción */}
      <View style={styles.accionesRow}>
        <TouchableOpacity
          style={styles.btnNueva}
          onPress={() => cambiarFrase(categoriaSeleccionada || undefined)}
        >
          <Text style={styles.btnNuevaText}>🔄  Nueva frase</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnCompartir} onPress={compartir}>
          <Text style={styles.btnCompartirText}>📤  Compartir</Text>
        </TouchableOpacity>
      </View>

      {/* Categorías */}
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

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {FRASES.length} frases para inspirarte cada día
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#a0a0c0',
    marginTop: 4,
  },
  fraseCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    minHeight: 220,
    justifyContent: 'center',
  },
  categoriaEmoji: {
    fontSize: 42,
    marginBottom: 16,
  },
  fraseTexto: {
    fontSize: 20,
    color: '#e8e8f0',
    textAlign: 'center',
    lineHeight: 30,
    fontStyle: 'italic',
    fontWeight: '400',
  },
  fraseAutor: {
    fontSize: 15,
    color: '#8888aa',
    marginTop: 16,
    fontWeight: '500',
  },
  categoriaBadge: {
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
  },
  categoriaBadgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  accionesRow: {
    flexDirection: 'row',
    marginHorizontal: 20,
    gap: 12,
  },
  btnNueva: {
    flex: 1,
    backgroundColor: '#0f3460',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnNuevaText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  btnCompartir: {
    flex: 1,
    backgroundColor: '#533483',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  btnCompartirText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  categoriasLabel: {
    color: '#a0a0c0',
    fontSize: 15,
    marginLeft: 24,
    marginTop: 24,
    marginBottom: 10,
    fontWeight: '500',
  },
  categoriasScroll: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoriaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#16213e',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2a2a4a',
  },
  categoriaEmojiBadge: {
    fontSize: 18,
  },
  categoriaBtnText: {
    color: '#a0a0c0',
    fontSize: 15,
    fontWeight: '500',
  },
  categoriaBtnTextActiva: {
    color: '#ffffff',
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: 'auto',
  },
  footerText: {
    color: '#555577',
    fontSize: 13,
  },
});
