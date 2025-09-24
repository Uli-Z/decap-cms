# Plan zur Integration von Dateien aus Unterordnern

## Ziele
- Das bestehende System zur Erstellung der Kollektion soll so erweitert werden, dass auch Dateien aus Unterordnern automatisch erkannt und integriert werden.
- Bestehende Funktionen (z. B. Filterregeln, Sortierung, Vorschaugeneration) sollen unverändert weiter funktionieren.

## Arbeitsschritte
1. **Ist-Analyse**
   - Ermitteln, welche Module die Kollektion aufbauen (vermutlich im Bereich `packages/*`).
   - Prüfen, wie aktuell die Dateiliste generiert wird (z. B. `fs.readdir`, Konfiguration über `folder`/`filter`).
2. **Rekursions-Strategie definieren**
   - Festlegen, ob eine generische rekursive Durchquerung für alle Kollektionstypen aktiviert werden soll oder ob dies konfigurierbar bleibt.
   - Grenzen festlegen (z. B. Ausschluss bestimmter Verzeichnisse oder Dateitypen).
3. **Implementierung**
   - Anpassung der Dateiscan-Logik, um Unterordner rekursiv zu traversieren.
   - Sicherstellen, dass Metadaten (Slug, Pfad, Collections-Config) korrekt für Dateien aus Unterordnern ermittelt werden.
4. **Tests & Validierung**
   - Unit- oder Integrationstests aktualisieren oder ergänzen, die Fälle mit Unterordnern abdecken.
   - Manuelle Prüfung in einer Beispielkollektion (z. B. `dev-test`) ob Einträge aus Unterordnern erscheinen.
5. **Dokumentation**
   - Anpassung der Dokumentation/Konfigurationshinweise, damit Nutzer:innen wissen, dass Unterordner unterstützt werden und wie man sie ggf. ausschließt.

## Mögliche Stolpersteine
- **Performance**: Rekursives Durchsuchen großer Verzeichnisbäume kann langsam sein; eventuell Caching oder Limitierung notwendig.
- **Kompatibilität**: Bestehende Projekte könnten auf die bisherige flache Struktur angewiesen sein. Ggf. Feature über Konfigurations-Flag oder `depth`-Option absichern.
- **Namenskonflikte**: Dateien unterschiedlicher Unterordner könnten gleiche Slugs erzeugen. Slug-Generierung muss Pfadkomponenten berücksichtigen.
- **Symlinks / Zyklen**: Rekursion muss symbolische Links oder zyklische Strukturen beachten, um Endlosschleifen zu vermeiden.
- **Filter**: Bestehende Filterregeln (z. B. `filter: {field: "path"}`) müssen auch für tiefere Pfade funktionieren.

## Abgleich mit Grund-Design-Ideen
- Das Grunddesign von Decap CMS basiert auf flexibler Dateikonfiguration. Eine rekursive Erweiterung fügt sich grundsätzlich ein, solange Standardverhalten konfigurierbar bleibt.
- Wichtig ist, die Einfachheit für bestehende Nutzer:innen zu erhalten (z. B. unverändertes Verhalten ohne Opt-in). Daher sollte die Erweiterung optional oder abwärtskompatibel gestaltet werden.

