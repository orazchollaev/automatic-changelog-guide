# Otomatik Changelog Sistemi

Commit mesajlarından otomatik olarak versiyon yükseltme, changelog oluşturma ve git tag atma işlemlerini yapan sistem.

**Araçlar:** `release-it` · `commitlint` · `husky` · `lint-staged`

---

## Proje Yapisi

```
app/
├── assets/style/index.css   ← stiller
├── layouts/default.vue      ← layout
└── pages/index.vue          ← sayfa
content/
└── index.md                 ← bu döküman
.husky/                      ← git hook'ları
commitlint.config.js         ← commit kuralları
.release-it.json             ← release konfigürasyonu
```

---

## Sistem Nasil Calisir

Üç katmandan oluşur:

1. **Commit aşaması** — `husky` + `commitlint` her commit'i kurala göre doğrular
2. **Lint aşaması** — `lint-staged` sadece değişen dosyaları lint eder
3. **Release aşaması** — `release-it` commit geçmişini okuyarak versiyon ve changelog üretir

---

## Adim 1 Commit Formati

Her commit şu formata uymak zorunda (`commitlint.config.js` ile zorunlu kılındı):

```
<type>: <açıklama>
```

`header-max-length` kuralı gereği başlık en fazla **100 karakter** olabilir, nokta ile bitemez.

### Commit Turleri

| Tür        | Bölüm (CHANGELOG)      | Ne Zaman                   |
| ---------- | ---------------------- | -------------------------- |
| `feat`     | Features               | Yeni özellik               |
| `fix`      | Bug Fixes              | Hata düzeltmesi            |
| `docs`     | Documentation          | Döküman değişikliği        |
| `style`    | Styles                 | Biçim, boşluk (mantık yok) |
| `refactor` | Refactoring            | Yeniden yazım              |
| `perf`     | Performance            | Hız iyileştirmesi          |
| `test`     | Tests                  | Test ekleme/güncelleme     |
| `build`    | Build System           | Build sistemi              |
| `ci`       | Continuous Integration | CI/CD değişikliği          |
| `chore`    | Chores                 | Genel bakım                |
| `revert`   | Reverts                | Geri alma                  |

### Gecerli Commitler

```bash
git commit -m "feat: dark mode eklendi"
git commit -m "fix: mobil menü taşma sorunu düzeltildi"
git commit -m "docs: kurulum adımları güncellendi"
git commit -m "chore: pnpm lockfile güncellendi"
```

### Gecersiz Commitler

```bash
git commit -m "update stuff"        ✗  type yok
git commit -m "Feat: bir şey"       ✗  büyük harf type
git commit -m "fix: düzeltildi."    ✗  nokta ile bitiyor
git commit -m ""                    ✗  boş mesaj
```

---

## Adim 2 Husky Git Hooklari

`prepare` scripti (`pnpm prepare`) Husky'yi kurar. İki hook çalışır:

### Pre Commit

Commit öncesi `lint-staged` çalıştırır:

```bash
# .husky/pre-commit
pnpm lint-staged
```

`lint-staged` sadece stage edilmiş dosyalara bakar (`package.json`'dan):

```json
{
  "*.{js,ts,vue}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,json,md}": ["prettier --write"]
}
```

Lint hatası varsa commit durur.

### Commit Msg

Commit mesajını `commitlint` ile doğrular:

```bash
# .husky/commit-msg
pnpm commitlint --edit $1
```

Format yanlışsa commit durur ve hata gösterir.

---

## Adim 3 Release

### Dry Run

Önce ne olacağını gör, hiçbir şey değişmez:

```bash
pnpm release:dry
```

Çıktı şuna benzer:

```
» Changelog:
## v0.2.0

### Features
- dark mode eklendi

### Bug Fixes
- mobil menü taşma sorunu düzeltildi

» package.json: 0.1.0 → 0.2.0
» Commit: chore(release): v0.2.0
» Tag: v0.2.0
```

### Gercek Release

```bash
pnpm release          ← otomatik versiyon (commit'lere göre)
pnpm release:patch    ← zorla patch  0.1.0 → 0.1.1
pnpm release:minor    ← zorla minor  0.1.0 → 0.2.0
pnpm release:major    ← zorla major  0.1.0 → 1.0.0
```

`requireCleanWorkingDir: true` olduğu için working tree temiz olmalı.

### Release Siralama

`release-it` şunları sırayla yapar:

1. `CHANGELOG.md` dosyasını günceller
2. `package.json` içindeki `version`'ı yükseltir
3. Git commit atar: `chore(release): v0.2.0`
4. Git tag koyar: `v0.2.0`

---

## Adim 4 Versiyonlama Kurali

`release-it` commit türlerine göre versiyonu otomatik belirler:

| Commit Türü               | Versiyon Değişimi | Örnek           |
| ------------------------- | ----------------- | --------------- |
| `fix`, `docs`, `style`... | patch             | `0.1.0 → 0.1.1` |
| `feat`                    | minor             | `0.1.0 → 0.2.0` |
| `BREAKING CHANGE`         | major             | `0.1.0 → 1.0.0` |

Breaking change için commit footer'ına eklenir:

```bash
git commit -m "feat!: API tamamen yeniden yazıldı

BREAKING CHANGE: eski endpoint'ler kaldırıldı"
```

---

## Tam Workflow

```bash
# 1. Değişiklik yap
git add .

# 2. Commit at (husky otomatik lint + format çalıştırır)
git commit -m "feat: yeni özellik eklendi"

# 3. Önizle
pnpm release:dry

# 4. Release al
pnpm release
```

---

## Ornek Changelog Ciktisi

`CHANGELOG.md` otomatik oluşturulur (`.release-it.json` → `infile: CHANGELOG.md`):

```md
## v0.2.0 (2025-01-15)

### Features

- yeni özellik eklendi

### Bug Fixes

- mobil menü sorunu düzeltildi

### Documentation

- kurulum adımları güncellendi
```

---

## Versiyonlama

| Versiyon | Açıklama                       |
| -------- | ------------------------------ |
| `0.0.x`  | Erken geliştirme, kararsız     |
| `0.1.x`  | Kullanılabilir, geliştiriliyor |
| `1.0.0`  | Stabil, production-ready       |

Şu an: **v0.1.0**

---

## Notlar

- `requireCleanWorkingDir: true` — release öncesi `git status` temiz olmalı
- `pnpm@10.28.2` — workspace destekli, lockfile commit'lenmeli
- GitHub release kapalı (`.release-it.json` → `"github": { "release": false }`)
- `packageManager` alanı pnpm versiyonunu kilitler, farklı versiyonla kurulum hata verir
