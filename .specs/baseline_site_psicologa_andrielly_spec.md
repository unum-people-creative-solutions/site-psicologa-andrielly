# Baseline Spec - Psicóloga Andrielly Oliveira

## 📊 Status Atual (Audit)
- **Google Ads**: ✅ Configurado (AW-17122840229)
- **CRM Integration**: ✅ Implementado e Padronizado (`lib/crm.ts`, `LeadModal.tsx`)
- **SEO**: ✅ Metadata, Robots, Sitemap configurados.
- **Tracking**: ✅ Captura GCLID, FBCLID, MSCLKID e UTMs no `LeadContext` com persistência em `sessionStorage`.
- **Origem**: ✅ Detecção automática baseada em Ads implementada.

## 🏗️ Stack Técnica
- **Framework**: Next.js 14+
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (UX Premium)
- **Components**: LeadModal, LeadProvider (Sincronizados com o padrão Unum People)

## 🔗 Integrações
- **CRM Endpoint**: `/ingest`
- **Data Pattern**: Já segue o padrão global com `origem` obrigatória e múltiplos rastreadores (fbclid, msclkid).

## 🛠️ Próximos Passos (Melhorias)
- Verificar se a lógica de preenchimento da `origem` está alinhada com a `GENERAL_SPEC.md` (detecção automática de Ads).
