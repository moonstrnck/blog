export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto flex h-14 items-center justify-center">
        <p className="text-muted-foreground text-sm">moonstrnck • © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
