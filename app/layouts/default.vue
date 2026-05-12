<script setup lang="ts">
const appVersion = useRuntimeConfig().public.appVersion

const navItems = [
  { label: "Giriş", id: "otomatik-changelog-sistemi", section: "overview" },
  { label: "Nasıl Çalışır?", id: "nasil-calisir", section: "overview" },
  { label: "Commit Türleri", id: "commit-turleri", section: "reference" },
  { label: "Örnek Commitler", id: "ornek-commitler", section: "reference" },
  { label: "Release Komutları", id: "release-komutlari", section: "commands" },
  { label: "Dry Run", id: "dry-run", section: "commands" },
  { label: "Gerçek Release", id: "gercek-release", section: "commands" },
  { label: "Örnek CHANGELOG", id: "ornek-changelog-ciktisi", section: "commands" },
  { label: "Husky", id: "husky", section: "config" },
  { label: "pre-commit", id: "pre-commit", section: "config" },
  { label: "commit-msg", id: "commit-msg", section: "config" },
  { label: "lint-staged", id: "lint-staged", section: "config" },
  { label: "Önerilen Workflow", id: "onerilen-workflow", section: "config" },
  { label: "Versiyonlama", id: "versiyonlama", section: "config" },
  { label: "Notlar", id: "notlar", section: "config" },
]

const sections = [
  { key: "overview", label: "Genel Bakış" },
  { key: "reference", label: "Referans" },
  { key: "commands", label: "Komutlar" },
  { key: "config", label: "Konfigürasyon" },
]

const activeId = ref("")

function getHeadingEl(id: string): HTMLElement | null {
  const el = document.getElementById(id)
  if (el) return (el.closest("h1,h2,h3") as HTMLElement) ?? el
  for (const h of document.querySelectorAll<HTMLElement>("h1[id],h2[id],h3[id]")) {
    if (h.id === id) return h
  }
  return null
}

if (import.meta.client) {
  ;(window as any).__headings = () => {
    const els = document.querySelectorAll("h1[id],h2[id],h3[id]")
    console.table(
      [...els].map((el) => ({ tag: el.tagName, id: el.id, text: el.textContent?.trim() }))
    )
  }
}

onMounted(() => {
  const onScroll = () => {
    const bar = document.getElementById("progress-bar")
    if (!bar) return
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    bar.style.width = `${Math.min(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0, 100)}%`
  }
  window.addEventListener("scroll", onScroll, { passive: true })

  const headingEls = navItems.map((i) => getHeadingEl(i.id)).filter(Boolean) as HTMLElement[]
  if (!headingEls.length) return

  const topbarH = () => (document.querySelector(".topbar") as HTMLElement)?.offsetHeight ?? 52

  const setActiveByScroll = () => {
    const scrollY = window.scrollY + topbarH() + 8
    let current = headingEls[0]
    for (const el of headingEls) {
      if (el.offsetTop <= scrollY) current = el
    }
    activeId.value = current!.id
  }
  setActiveByScroll()

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: "-52px 0px -60% 0px", threshold: 0 }
  )
  headingEls.forEach((el) => observer.observe(el))

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener("scroll", onScroll)
  })
})

function scrollTo(id: string) {
  const el = getHeadingEl(id)
  if (!el) {
    console.warn(`[scrollTo] Heading bulunamadı: "${id}" — window.__headings() çalıştır.`)
    return
  }
  const topbarH = (document.querySelector(".topbar") as HTMLElement)?.offsetHeight ?? 52
  const top = el.getBoundingClientRect().top + window.scrollY - topbarH - 16
  window.scrollTo({ top, behavior: "smooth" })
  activeId.value = id
}
</script>

<template>
  <div class="layout-wrapper">
    <header class="topbar">
      <a href="/" class="topbar-logo">
        <div class="topbar-logo-icon">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 2h4v4H2zM8 2h4v4H8zM2 8h4v4H2zM8 8h4v4H8z"
              fill="currentColor"
              opacity=".9"
            />
          </svg>
        </div>
        <span class="topbar-logo-text">changelog-guide</span>
      </a>
      <span class="topbar-sep">/</span>
      <span class="topbar-path">
        <span class="topbar-path-seg">docs</span>
        <span class="topbar-path-slash">/</span>
        <span class="topbar-path-current">index</span>
      </span>
      <div class="topbar-spacer" />
      <span class="topbar-badge">v{{ appVersion }}</span>
    </header>

    <nav class="sidebar">
      <div class="sidebar-inner">
        <div v-for="section in sections" :key="section.key" class="sidebar-section">
          <div class="sidebar-label">
            <span class="sidebar-label-line" />
            {{ section.label }}
          </div>
          <button
            v-for="item in navItems.filter((n) => n.section === section.key)"
            :key="item.id"
            class="sidebar-link"
            :class="{ active: activeId === item.id }"
            @click="scrollTo(item.id)"
          >
            <span class="sidebar-link-indicator" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </nav>

    <main class="main-content">
      <div class="page-progress">
        <div id="progress-bar" class="page-progress-bar" style="width: 0%" />
      </div>
      <slot />
    </main>
  </div>
</template>
