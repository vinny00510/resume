# Vinicius Alvarez Curriculo

Portfolio espacial interativo, responsivo e pronto para GitHub Pages.

## Estrutura
- `index.html`: estrutura do site.
- `css/style.css`: visual, responsividade, planetas e animacoes.
- `js/data.js`: experiencias, habilidades, projetos, formacao e certificacoes.
- `js/app.js`: renderizacao, navegacao, estrelas e interacoes.
- `assets/`: coloque aqui imagens e o PDF do curriculo, se desejar.

## Como personalizar
Edite `js/data.js`. Para incluir um projeto, copie um objeto dentro de `projects`:

```js
{
  name: "Novo projeto",
  status: "Desenvolvimento",
  description: "Descricao do projeto.",
  technologies: ["Python", "IA"]
}
```

## Publicar no GitHub Pages
1. Extraia o ZIP.
2. Envie o conteudo da pasta para a raiz do repositorio `vinny00510/resume`.
3. No GitHub, abra Settings > Pages.
4. Em Source, selecione Deploy from a branch.
5. Selecione `main` e `/ (root)`, depois Save.
6. O endereco publicado sera o mesmo GitHub Pages do repositorio.

## Observacao
Revise datas, cargos, formacao e certificacoes em `js/data.js` antes da publicacao.
