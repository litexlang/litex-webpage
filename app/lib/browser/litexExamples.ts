export default [
  {
    title: "syllogism.lix",
    code: `set human
prop intelligent(x human)

know:
    forall x human:
        x is intelligent

obj Jordan human
Jordan is intelligent`,
  },
  {
    title: "multivariate_linear_equation.lix",
    code: `obj x R, y R:
    2 * x + 3 * y = 10
    4 * x + 5 * y = 14

2 * (2 * x + 3 * y) = 2 * 10
4* x + 6 * y = 2 * 10
(4*x + 6 * y) - (4*x + 5 * y) = 2 * 10 - 14
(4*x + 6 * y) - (4*x + 5 * y) = y
y  = 6
2 * x + 3 * 6 = 10
2 * x + 18 - 18 = 10 - 18
2 * x + 18 - 18 = -8
(2 * x) / 2 = -8 / 2
(2 * x) / 2 = x
x = -4`,
  },
];
