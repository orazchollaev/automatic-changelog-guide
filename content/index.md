# Otomatik Changelog Sistemi

Bu proje aşağıdaki araçları kullanarak otomatik changelog ve release sistemi oluşturur:

- `release-it`
- `@release-it/conventional-changelog`
- `commitlint`
- `husky`
- `lint-staged`

Bu sistem sayesinde commit mesajlarından otomatik olarak sürüm yükseltme, changelog oluşturma ve git tag oluşturma işlemleri yapılır.

---

## Nasil Calisir

Her commit belirli bir formata göre yazılır.

```bash
feat: dark mode dokümantasyonu eklendi
fix: mobil navbar taşma sorunu düzeltildi
docs: kurulum rehberi güncellendi
```

Release oluşturulduğunda sistem:

1. Commit geçmişini analiz eder
2. Yeni versiyonu belirler
3. `CHANGELOG.md` dosyasını oluşturur
4. Git tag oluşturur

---

## Commit Turleri

| Tür        | Açıklama                     |
| ---------- | ---------------------------- |
| `feat`     | Yeni özellik                 |
| `fix`      | Hata düzeltmesi              |
| `docs`     | Dokümantasyon değişiklikleri |
| `style`    | Stil değişiklikleri          |
| `refactor` | Kod düzenleme                |
| `perf`     | Performans iyileştirmesi     |
| `test`     | Testler                      |
| `build`    | Build sistemi değişiklikleri |
| `ci`       | CI/CD değişiklikleri         |
| `chore`    | Genel bakım işlemleri        |
| `revert`   | Geri alınan commitler        |

---

## Ornek Commitler

```bash
git commit -m "feat: comic button örnekleri eklendi"
git commit -m "fix: sidebar responsive sorunu düzeltildi"
git commit -m "docs: kurulum bölümü geliştirildi"
git commit -m "style: comic shadow efektleri geliştirildi"
```

---

## Release Komutlari

Release oluşturmak için iki adım vardır: önce dry run ile önizleme yapın, ardından gerçek release'i çalıştırın.

---

## Dry Run

Gerçek release oluşturmadan önizleme yapar:

```bash
pnpm release:dry
```

---

## Gercek Release

Yeni release oluşturur:

```bash
pnpm release
```

Bu işlem otomatik olarak version günceller, `CHANGELOG.md` oluşturur ve git tag ekler.

---

## Ornek Changelog Ciktisi

```md
# Changelog

## v0.0.1

### Features

- comic button örnekleri eklendi

### Bug Fixes

- mobil navbar sorunu düzeltildi

### Documentation

- kurulum rehberi geliştirildi
```

---

## Husky

Projede Git hook sistemi olarak Husky kullanılır. İki aşamalı kontrol sistemi sağlar.

---

## Pre Commit

Her commit öncesi çalışır:

- ESLint
- Prettier
- lint-staged

---

## Commit Msg

Commit mesajını `commitlint` ile kontrol eder.

Geçersiz örnek:

```bash
git commit -m "update stuff"
```

Geçerli örnek:

```bash
git commit -m "feat: changelog dokümantasyonu eklendi"
```

---

## Lint Staged

Sadece stage edilmiş dosyaları lint eder:

```json
{
  "lint-staged": {
    "*.{js,mjs,cjs,ts,vue}": ["eslint --fix"],
    "*.{json,md,yml,yaml,css,scss}": ["prettier --write"]
  }
}
```

---

## Onerilen Workflow

```bash
git add .
git commit -m "feat: yeni dokümantasyon bölümü eklendi"
pnpm release
```

---

## Versiyonlama

Bu proje Semantic Versioning kullanır.

| Versiyon | Açıklama                |
| -------- | ----------------------- |
| `0.0.x`  | Erken geliştirme        |
| `0.1.x`  | Kullanılabilir sürümler |
| `1.0.0`  | Stabil sürüm            |

---

## Notlar

- Commit mesajlarını açıklayıcı yazın.
- Commit türlerini küçük harf kullanın.
- Generic commit mesajlarından kaçının.
- Changelog commit geçmişinden otomatik oluşturulur.
