<script setup lang="ts">
// @nuxt/content heading ID slugification:
// Turkish chars: ı→i, ö→o, ü→u, ş→s, ç→c, ğ→g, spaces→-, special chars removed.
// Hierarchy: h1 = page title only, h2 = sections, h3 = subsections.
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

// Returns the heading element for a given id.
// @nuxt/content v2 puts id on the <h2> itself; some versions put it on the
// inner <a>. Either way we want the heading element for correct offset math.
function getHeadingEl(id: string): HTMLElement | null {
  const el = document.getElementById(id)
  if (!el) return null
  // If the id landed on an <a> inside the heading, walk up.
  return (el.closest("h1, h2, h3") as HTMLElement) ?? el
}

onMounted(() => {
  // Progress bar
  const onScroll = () => {
    const bar = document.getElementById("progress-bar")
    if (!bar) return
    const scrollTop = window.scrollY
    const docHeight = document.body.scrollHeight - window.innerHeight
    bar.style.width = `${Math.min(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0, 100)}%`
  }
  window.addEventListener("scroll", onScroll, { passive: true })

  // Collect heading elements via navItems order so we can do a fallback
  // scroll-position lookup when IntersectionObserver hasn't fired yet.
  const headingEls = navItems.map((item) => getHeadingEl(item.id)).filter(Boolean) as HTMLElement[]

  if (!headingEls.length) return

  // Set the initially active item based on scroll position.
  const setActiveByScroll = () => {
    const topbarHeight = (document.querySelector(".topbar") as HTMLElement)?.offsetHeight ?? 52
    const scrollY = window.scrollY + topbarHeight + 8

    let current = headingEls[0]
    for (const el of headingEls) {
      if (el.offsetTop <= scrollY) current = el
    }
    activeId.value = current!.id
  }

  setActiveByScroll()

  // IntersectionObserver for smooth active tracking while scrolling.
  const observer = new IntersectionObserver(
    (entries) => {
      // Pick the topmost intersecting heading.
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

      if (visible[0]) {
        activeId.value = visible[0].target.id
      }
    },
    { rootMargin: "-52px 0px -60% 0px", threshold: 0 }
  )

  headingEls.forEach((el) => observer.observe(el))

  onUnmounted(() => {
    observer.disconnect()
    window.removeEventListener("scroll", onScroll)
  })
})

// Smooth scroll to heading with dynamic topbar offset.
function scrollTo(id: string) {
  const el = getHeadingEl(id)
  if (!el) return
  const topbarHeight = (document.querySelector(".topbar") as HTMLElement)?.offsetHeight ?? 52
  const top = el.getBoundingClientRect().top + window.scrollY - topbarHeight - 16
  window.scrollTo({ top, behavior: "smooth" })
}
</script>

<template>
  <div class="layout-wrapper">
    <!-- Top Bar -->
    <header class="topbar">
      <a href="/" class="topbar-logo">
        <div class="topbar-logo-icon">cl</div>
        <span class="topbar-logo-text">changelog-guide</span>
      </a>
      <span class="topbar-sep">/</span>
      <span class="topbar-path">
        <span>docs</span>
        / index
      </span>
      <div class="topbar-spacer" />
      <span class="topbar-badge">v0.1.0</span>
    </header>

    <!-- Sidebar -->
    <nav class="sidebar">
      <div v-for="section in sections" :key="section.key" class="sidebar-section">
        <div class="sidebar-label">{{ section.label }}</div>
        <button
          v-for="item in navItems.filter((n) => n.section === section.key)"
          :key="item.id"
          class="sidebar-link"
          :class="{ active: activeId === item.id }"
          @click="scrollTo(item.id)"
        >
          <span class="dot" />
          {{ item.label }}
        </button>
        <hr class="sidebar-divider" />
      </div>
    </nav>

    <!-- Main -->
    <main class="main-content">
      <div class="page-progress">
        <div id="progress-bar" class="page-progress-bar" style="width: 0%" />
      </div>
      <slot />
    </main>
  </div>
</template>
