# Otomatik Changelog Sistemi

Bu proje aşağıdaki araçları kullanarak otomatik changelog ve release sistemi oluşturur:

- `release-it`
- `@release-it/conventional-changelog`
- `commitlint`
- `husky`
- `lint-staged`

Bu sistem sayesinde commit mesajlarından otomatik olarak:

- sürüm yükseltme
- changelog oluşturma
- git tag oluşturma

işlemleri yapılır.

---

# Nasıl Çalışır?

Her commit belirli bir formata göre yazılır.

Örnek:

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

# Commit Türleri

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

# Örnek Commitler

```bash
git commit -m "feat: comic button örnekleri eklendi"

git commit -m "fix: sidebar responsive sorunu düzeltildi"

git commit -m "docs: kurulum bölümü geliştirildi"

git commit -m "style: comic shadow efektleri geliştirildi"
```

---

# Release Komutları

## Dry Run

Gerçek release oluşturmadan önizleme yapar:

```bash
pnpm release:dry
```

---

## Gerçek Release

Yeni release oluşturur:

```bash
pnpm release
```

Bu işlem otomatik olarak:

- version günceller
- `CHANGELOG.md` oluşturur
- git tag oluşturur

---

# Örnek CHANGELOG Çıktısı

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

# Husky

Projede Git hook sistemi olarak Husky kullanılır.

---

## pre-commit

Her commit öncesi çalışır:

- ESLint
- Prettier
- lint-staged

---

## commit-msg

Commit mesajını kontrol eder.

Geçersiz örnek:

```bash
git commit -m "update stuff"
```

Geçerli örnek:

```bash
git commit -m "feat: changelog dokümantasyonu eklendi"
```

---

# lint-staged

Sadece stage edilmiş dosyaları lint eder.

Örnek yapı:

```json
{
  "lint-staged": {
    "*.{js,mjs,cjs,ts,vue}": ["eslint --fix"],
    "*.{json,md,yml,yaml,css,scss}": ["prettier --write"]
  }
}
```

---

# Önerilen Workflow

```bash
git add .

git commit -m "feat: yeni dokümantasyon bölümü eklendi"

pnpm release
```

---

# Versiyonlama

Bu proje Semantic Versioning kullanır.

| Versiyon | Açıklama                |
| -------- | ----------------------- |
| `0.0.x`  | Erken geliştirme        |
| `0.1.x`  | Kullanılabilir sürümler |
| `1.0.0`  | Stabil sürüm            |

---

# Notlar

- Commit mesajlarını açıklayıcı yazın.
- Commit türlerini küçük harf kullanın.
- Generic commit mesajlarından kaçının.
- Changelog commit geçmişinden otomatik oluşturulur.
