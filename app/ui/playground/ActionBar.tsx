import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { PlayArrow, PlaylistPlay } from "@mui/icons-material";
import { L_InteractWithFrontend } from "@/app/lib/tslitex/L_Frontend";
import { useDispatch } from "react-redux";
import { modifyOutput } from "@/app/lib/store/slices/outputSlice";
import { MutableRefObject } from "react";
import { editor } from "monaco-editor";
import { modifyEnv } from "@/app/lib/store/slices/envSlice";
import { L_Env } from "@/app/lib/tslitex/L_Env";
import { modifyCode } from "@/app/lib/store/slices/codeSlice";

export default function ActionBar({
  code,
  editorRef,
}: {
  code: string;
  editorRef:
  | MutableRefObject<editor.IStandaloneCodeEditor>
  | MutableRefObject<null>;
}) {
  // redux vars
  const dispatch = useDispatch();

  const examples = [{
    title: "comparision.litex", content: `/* LaTeX version
Define a property called "human", which takes in one parameter.
Define a property called "mortal", which takes in one parameter.
Define a variable called "Socrates", which has property human.
*/

/* Lean4 version
variable (Human : Type)
variable (Mortal : Human → Prop)
variable (Socrates : Human)
*/

/* LiTeX version */
concept something is human;
concept something is mortal;
let Socrates: Socrates is human;

/* LaTeX version
It is known fact that all human is mortal.
Claim: Socrates is mortal.
*/

/* Lean4 version
axiom all_humans_are_mortal : ∀ (x : Human), Mortal x
theorem socrates_is_mortal : Mortal Socrates := by
  apply all_humans_are_mortal
#check socrates_is_mortal
*/

/* LiTeX version */
know if x: x is human {
  x is mortal
};
Socrates is mortal; 

/* LaTeX version
Claim: all human is mortal.
*/

/* Lean4 version
def all_humans_will_die : Prop := ∀ (x : Human), Mortal x
theorem prove_all_humans_will_die : all_humans_will_die := all_humans_are_mortal
*/

/* LiTeX version */
if x: x is human {x is mortal};

/* LaTeX version
Define a variable called "god", it has property that it is not mortal.
Prove by contradiction: god is not human.
*/

/* Lean4 version
#check prove_all_humans_will_die
variable (God : Type)
variable (god : God)
axiom god_is_immortal : ¬ Mortal God
theorem god_is_not_human : God ≠ Human :=
  by
  intro h
  have god_is_mortal : Mortal God := all_humans_are_mortal god,
  contradiction
*/

/* LiTeX version */
let god: not god is mortal;
prove_by_contradiction not god is human {
  god is mortal;
}  god is human;
not god is human;`}, {
    title: "group_theory.litex", content: `concept $group(G);
concept x in S;
concept x eq y;

operator \\*{G,g1,g2}: G is group, g1 in G, g2 in G; 
know if G, g1, g2: G is group, g1 in G, g2 in G {\\*{G,g1,g2} in G};
know if G, g1, g2, g3: G is group, g1 in G, g2 in G, g3 in G {
  \\*{G, \\*{G, g1, g2}, g3} eq \\*{G, g1, \\*{G, g2, g3} }
};

operator \\1{G}: G is group;
know if G: G is group {\\1{G} in G};
know if G, g: G is group, g in G {
  \\*{G, \\1{G}, g} eq g,
  \\*{G, g, \\1{G} } eq g
};

operator \\inv{G, g}: G is group, g in G;
know if G, g: G is group, g in G {
  \\*{G, \\inv{G, g}, g} eq \\1{G},
  \\*{G, g, \\inv{G, g} } eq \\1{G}
};` }, {
    title: "set_theory.litex", content: `/* The following examples are LiTeX versions of Chapter 3 from Terence Tao's 
famous book *Analysis I*. I have provided the LaTeX version as a comment 
alongside to help you understand the meaning of each statement. What stands out 
most is how LiTeX requires far less typing (nearly 50% less) than LaTeX, making 
it not only more efficient but also exceptionally user-friendly. Unlike other 
formal proof languages, LiTeX can be used as a practical tool for everyday 
tasks, rather than just an auxiliary support language. */

/* Axiom 3.1 (Sets are objects). If A is a set, then A is also an object. 
In particular, given two sets A and B, it is meaningful to ask whether A is 
also an element of B. */

concept $object(x);
concept $set(x);
know if x: $set(x) {
  $object(x)
};

/* In this file, code embrace by {} are executed in a local environment and 
reader might read them as if it is 'test-code' for what has be declared. */
{
  let a: $set(a);
  $object(a);
}

/* Definition 3.1.4 (Equality of sets). Two sets A and B are equal, A = B, iff 
every element of A is an element of B and vice versa. To put it another way,
A = B if and only if every element x of A belongs also to B, and every element 
y of B belongs also to A. */

concept $equal(a,b);
concept $in(x,a);
know if a,b: $set(a), $set(b), $equal(a,b)  {
  if x: $in(x,a) {
    $in(x,b)
  }, 
  if x: $in(x,b) {
    $in(x,a)
  }
};

know if a,b: $set(a), $set(b), if x: $in(x,a) {$in(x,b)}, if x: $in(x,b) {$in(x,a)} {
  $equal(a,b)
};

{
  let a, b: $set(a), $set(b), $equal(a,b); 
  know if x: $in(x,a)  {
    $in(x,b)
  };
  know if x: $in(x,b)  {
    $in(x,a)
  }; 
  let x: $in(x,a); 
  $in(x,b); 
}

/* 
\\textbf{Axiom 3.2 (Empty set).}  
There exists a set $\\emptyset$, known as the \\textit{empty set}, such that:
\\[
\\forall x \\, (x \\notin \\emptyset),
\\]
i.e., it contains no elements. 
*/

let EMPTY_SET: $set(EMPTY_SET);
know if x: {
    not $in(x,EMPTY_SET),
};

{
    let x : not $in(x, EMPTY_SET);
    if x: {
        not $in(x,EMPTY_SET)[x],
    };
}

/*
Axiom 3.3 (Singleton sets and pair sets). If a is an object, then there exists a
set {a} whose only element is a, i.e., for every object y, we have y∈{a} if and 
only if y = a; we refer to {a} as the singleton set whose element is a. 
Furthermore, if a and b are objects, then there exists a set {a, b} whose only 
elements are a and b; i.e., for every object y, we have y ∈ {a, b} if and only 
if y = a or y = b; we refer to this set as the pair set formed by a and b.
*/

operator \\singleton{a};
know if x, a: $in(x, \\singleton{a}) {
    $equal(x, a),
};

know if x, a: $equal(x,a) {
    $in(x, \\singleton{a}),
};

{
    let a, b;
    know $set(\\singleton{a});
    let x;
    know $in(x, \\singleton{a});
    $equal(x,a);
    $in(x, \\singleton{a});
    if _x, _a: $equal(_x,_a) {
        $in(_x, \\singleton{_a})[_x, _a],
    };
}

operator \\pair{a,b};

know if x, a, b: $in(x, \\pair{a,b}) {
    if : not $equal(x, b) {
        $equal(x, a),
    },
    if : not $equal(x, a) {
        $equal(x, b),
    }
};

know if x, a, b: $equal(x,a) {
    $in(x, \\pair{a,b}),
};

know if x, a, b: $equal(x,b) {
    $in(x, \\pair{a,b}),
};

{
    let x, a, b: $equal(x,a);
    $in(x, \\pair{a,b})[x,a,b];
    let y,c,d: $in(y, \\pair{c,d}), not $equal(y,c);
    $equal(y,d)[y,c,d;];
}


 
/*
Axiom 3.4 (Pairwise union). Given any two sets \\(A\\), \\(B\\), there exists a set 
\\(A \\cup B\\), called the union \\(A \\cup B\\) of \\(A\\) and \\(B\\), whose elements
consist of all the elements which belong to \\(A\\) or \\(B\\) or both. In other
words, for any object \\(x\\), 
\\[
x \\in A \\cup B \\iff (x \\in A \\lor x \\in B).
\\]
*/

operator \\union{x,y};
know if x, y: $set(x), $set(y) {
    if z: $in(z, x) {
        $in(z, \\union{x, y}),
    },
    if z: $in(z, y) {
        $in(z, \\union{x,y}),
    },
};

know if x, y, z: $in(z, \\union{x, y}) {
    if : not $in(z, x) {
        $in(z, y),
    },
    if : not $in(z, y) {
        $in(z, x),
    },
};

{
    let a,b: $set(a), $set(b);
    let x: $in(x,a);
    $in(x, \\union{a,b})[a,b; x];
    $in(x, \\union{a,b});
    let y, c, d: $in(y, \\union{c,d});
    know not $in(y, c);
    $in(y, d)[c,d,y;];
}


/*
Axiom 3.4 (Pairwise union). Given any two sets \\(A\\), \\(B\\), there exists a set 
\\(A \\cup B\\), called the union \\(A \\cup B\\) of \\(A\\) and \\(B\\), whose elements
consist of all the elements which belong to \\(A\\) or \\(B\\) or both. In other
words, for any object \\(x\\), 
\\[
x \\in A \\cup B \\iff (x \\in A \\lor x \\in B).
\\]
*/

concept $subset(x,y);

know if A,B: $subset(A,B) {
    if x: $in(x,A) {
        $in(x,B),
    },
};

know if A,B: if x: $in(x,A) {
    $in(x,B),
} {
    $subset(A,B),
};

{
    let A,B,C,D,E,F;
    know $subset(A,B);
    let x: $in(x,A);
    $in(x,B);
    $in(x,B)[A,B;x];
    $in(x,B);
}

/*
Axiom 3.5 (Axiom of specification). Let \\(A\\) be a set, and for each 
\\(x \\in A\\), let \\(P(x)\\) be a property pertaining to \\(x\\) (i.e., \\(P(x)\\) is 
either a true statement or a false statement). Then there exists a set, called
\\(\\{x \\in A : P(x) \\text{ is true}\\}\\) (or simply \\(\\{x \\in A : P(x)\\}\\) for 
short), whose elements are precisely the elements \\(x\\) in \\(A\\) for which 
\\(P(x)\\) is true. In other words, for any object \\(y\\),
\\[
y \\in \\{x \\in A : P(x) \\text{ is true}\\} \\iff (y \\in A \\text{ and } P(y) \\text{ is true}).
\\]
*/

/* 
operator \\subset_with_property{A,P}: $set(A), $is_property(P);

know if A, P: $is_property(P), $set(A) {
    $subset(\\subset_with_property{A,P}, A)
};

{
    concept $p(x);
    is_property(p);
    let x: $set(x);
    $subset(\\subset_with_property{x,p}, x)[x,p];
}
*/

/*
Definition 3.1.23 (Intersections). The intersection \\(S_1 \\cap S_2\\) of two sets
is defined to be the set
\\[
S_1 \\cap S_2 := \\{x \\in S_1 : x \\in S_2\\}.
\\]
In other words, \\(S_1 \\cap S_2\\) consists of all the elements which belong to
both \\(S_1\\) and \\(S_2\\). Thus, for all objects \\(x\\),
\\[
x \\in S_1 \\cap S_2 \\iff x \\in S_1 \\text{ and } x \\in S_2.
\\]
*/

operator \\intersection{a,b}; 
know if x, a, b: a is set, b is set, $in(x,a), $in(x,b) {
    $in(x, \\intersection{a,b})
};

know if x, a, b: $set(a), $set(b), $in(x, \\intersection{a,b}) {
    $in(x,a),
    $in(x, b)
};

{
    let A, B: $set(A), $set(B);
    let x;
    know $in(x,A), $in(x,B);
    $in(x, \\intersection{A,B})[x,A,B];
    if X: $in(X,A), $in(X,B) {
        $in(X, \\intersection{A,B})[X,A,B]
    };
    if X: $in(X, \\intersection{A,B}) {
        $in(X,A)[X,A,B],
        $in(X, B)[X,A,B]
    };
}

/*
Definition 3.1.27 (Difference sets). Given two sets \\(A\\) and \\(B\\), we define 
the set \\(A - B\\) or \\(A \\setminus B\\) to be the set \\(A\\) with any elements of
\\(B\\) removed:
\\[
A \\setminus B := \\{x \\in A : x \\notin B\\}.
\\]
*/

operator \\difference{a,b}: $set(a), $set(b);

know if x, a, b: $set(a), $set(b), $in(x,a), not $in(x,b) {
    $in(x, \\difference{a,b})
};

/*
Axiom 3.6 (Replacement). Let \\(A\\) be a set. For any object \\(x \\in A\\), and any
object \\(y\\), suppose we have a statement \\(P(x, y)\\) pertaining to \\(x\\) and 
\\(y\\), such that for each \\(x \\in A\\) there is at most one \\(y\\) for which 
\\(P(x, y)\\) is true. Then there exists a set \\(\\{y : P(x, y) \\text{ is true for
some } x \\in A\\}\\), such that for any object \\(z\\),
\\[
z \\in \\{y : P(x, y) \\text{ is true for some } x \\in A\\} \\iff P(x, z) \\text{ is 
true for some } x \\in A.
\\]
*/

/*
operator \\replacement{a,p}: $set(a), $is_property(p), if x, a: $set(a), $in(x,a) {
    if y1, y2: $p(x, y1), $p(x, y2) {
        $equal(y1, y2)
    };
};

operator \\replacement_var{z,a,p} ;


know if z, a, p: $set(a), $is_property(p), if x, a: $set(a), $in(x,a) {
    if y1, y2: $p(x, y1), $p(x, y2) {
        $equal(y1, y2)
    },
    $in(z, \\replacement{a,p})
} {
    $p(\\replacement_var{z,a,p}, z)
};


*/

concept $disjoint(a,b);

know if a,b : a is set, b is set, if x: $in(x, a)  {not $in(x, b)}, if x : $in(x,b)
{not $in(x, a)} {$disjoint(a,b)};


/*
Axiom 3.9 (Regularity). If A is a non-empty set, then there is at least one 
element x of A which is either not a set, or is disjoint from A.
*/

operator \\regularity_element{A} : $set(A), not $equal(A, EMPTY_SET);

know if A: $set(A), not $equal(A, EMPTY_SET) {
  if : not $set(\\regularity_element{A}) {
    $disjoint(A, \\regularity_element{A})
  },
  if : not $disjoint(A, \\regularity_element{A} ) {
    $set(\\regularity_element{A})
  }
};


/*
Axiom 3.7 (Infinity). There exists a set \\(N\\), whose elements are called 
natural numbers, as well as an object \\(0 \\in N\\), and an object \\(n^{++}\\)
assigned to every natural number \\(n \\in N\\), such that the Peano axioms 
(Axioms 2.1 - 2.5) hold.

Axiom 2.1. 0 is a natural number.
Axiom 2.2. If n is a natural number, then n++ is also a natural number.
Axiom 2.3. \\(0\\) is not the successor of any natural number; i.e., we have 
\\(n^{++} != 0\\) for every natural number \\(n\\).
Axiom 2.4. Different natural numbers must have different successors; i.e., if 
\\(n, m\\) are natural numbers and \\(n \\neq m\\), then \\(n^{++} \\neq m^{++}\\). 
Equivalently, if \\(n^{++} = m^{++}\\), then we must have \\(n = m\\).
Axiom 2.5 (Principle of mathematical induction). Let P(n) be any property 
pertaining to a natural number n. Suppose that P(0) is true, and suppose that 
whenever P(n) is true, P(n++) is also true. Then P(n) is true for every natural 
number n.
*/

concept $natural(x);
concept $nat_eq(x,y);

let 0: 0 is natural;

operator \\++{n}: n is natural;

know if n: n is natural {
    \\++{n} is natural
};

know if x: {
    not $nat_eq(0, \\++{x})
};

know if x,y: $nat_eq(x,y) {
    $nat_eq(\\++{x}, \\++{y})
};

know if x,y: $nat_eq(\\++{x}, \\++{y}) {
    $nat_eq(x,y)
};

/*
know if P: $is_property(P), $P(0), if n: n is natural, $P(n) {
    $P(\\++{n})
} {
    if m: m is natural {
        $P(m)
    };
};
*/
`
  }, {
    title: "syllogism.litex", content: `/* The file contains an example of syllogism(三段论). It turns out that It just 
takes 10% of typing(only ~10 lines) compared with using other formal languages 
like lean4. Comparison between Lean4 and LiTeX is in litex_vs_lean4.litex .*/

/*
Define a concept called "human". It takes one parameter. If it takes in a 
variable that is known  to be human, then human(something) (you can also write 
that as something is human, which means the same thing in LiTeX) is true. Define
a concept called "mortal", and it takes in one parameter. Anything that has 
property that it is human, it is mortal.
*/

concept $human(something);
concept $mortal(something);
know if x: $human(x) {
  $mortal(x)
};

/*
Introduce a variable called Socrates. It has property that it is human.
Then I ask LiTeX interpreter whether Socrates is mortal or not.
Since Socrates is human and anything that has property human has another
property called mortal, "Socrates is mortal" should return true.
Then I ask Then I ask LiTeX interpreter whether for all x, x is human, then
x is mortal. It should also return true.
*/

let Socrates: Socrates is human;
Socrates is mortal;
if x: x is human {x is mortal};

/*
Introduce a variable called god. It has property that it is not mortal.
Then prove by contradiction, it is not human. The procedure of that proof is,
suppose god is human, then god is mortal, then god is mortal is both true and 
false, which leads to contradiction.
*/
let god: not god is mortal;
prove_by_contradiction not $human(god) {
  god is mortal;
} god is mortal;`
  }]

  const getSelectionValue = () => {
    if (editorRef.current) {
      return editorRef.current
        .getModel()!
        .getValueInRange(editorRef.current.getSelection()!);
    } else {
      return "";
    }
  };

  const analyseCode = (inputCode: string) => {
    const runResult = L_InteractWithFrontend(new L_Env(), inputCode);
    console.log(runResult);

    dispatch(modifyOutput(runResult.messages));
    dispatch(modifyEnv(runResult.env));
  };

  const executeSelectedCode = () => {
    analyseCode(getSelectionValue());
  };

  const executeCode = () => {
    analyseCode(code);
  };

  const changeExample = (content: string) => {
    dispatch(modifyCode(content))
  }

  return (
    <Box display={"flex"}>
      <Typography variant="subtitle2" lineHeight={"32px"} sx={{ mr: 1 }}>Code Space</Typography>
      <Box flex={1}>
        {examples.map((example, index) => <Typography key={index} variant="caption" lineHeight={"32px"} mx={0.5} color="primary" sx={{ cursor: "pointer", textDecorationLine: "underline" }} onClick={() => { changeExample(example.content) }}>{example.title}</Typography>)}
      </Box>
      <Tooltip arrow title={"execute all code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeCode();
          }}
        >
          <PlayArrow fontSize="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip arrow title={"execute selected code"}>
        <IconButton
          size="small"
          onClick={() => {
            executeSelectedCode();
          }}
        >
          <PlaylistPlay fontSize="inherit" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}