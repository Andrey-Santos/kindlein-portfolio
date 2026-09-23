// Assinatura usada no rodape de todos os projetos Kindlein.
// Estilo inline de proposito: cola em qualquer projeto sem depender de Tailwind.
export function KindleinSignature() {
  return (
    <a
      href="https://kindlein.business"
      target="_blank"
      rel="noopener"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4em",
        fontSize: "0.75rem",
        color: "inherit",
        opacity: 0.7,
        textDecoration: "none",
      }}
    >
      Desenvolvido por
      <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 600 }}>
        <span style={{ color: "#10B981" }}>~/</span>kindlein
      </span>
    </a>
  );
}
