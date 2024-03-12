import receitasData from './receitas.json';

export function fetchReceitas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(receitasData);
    }, 500);
  });
}





