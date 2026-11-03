import IntelligenceModulePage from "@/components/intelligence-module-page"

const items = [
  { id: "CVE-2024-3094", title: "XZ Utils backdoor", detail: "Malicious build artifacts enabled unauthorized access through liblzma and downstream SSH tooling.", meta: "2m ago", severity: "Critical" },
  { id: "CVE-2024-21619", title: "Container escape in runc", detail: "A high-impact runtime issue affecting containerized workloads and build infrastructure.", meta: "18m ago", severity: "High" },
  { id: "CVE-2024-1709", title: "ConnectWise ScreenConnect auth bypass", detail: "Authentication controls can be bypassed to reach administrative functionality.", meta: "42m ago", severity: "High" },
  { id: "CVE-2024-23897", title: "Jenkins CLI arbitrary file read", detail: "Unauthenticated instances may expose sensitive files and credential material.", meta: "1h ago", severity: "Medium" },
]

export default function VulnerabilitiesPage() {
  return <IntelligenceModulePage eyebrow="Vulnerability intelligence" title="Vulnerabilities" description="Track the signals that change your exposure: severity, exploitability, affected packages, and the safeguards that reduce risk." stats={[{ label: "Tracked CVEs", value: "2,847" }, { label: "Critical", value: "45" }, { label: "New this week", value: "327" }, { label: "With public PoC", value: "913" }]} items={items} actionLabel="Open vulnerability explorer" actionHref="/taxonomy-explorer/attack-vectors" />
}
