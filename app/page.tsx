"use client";

import { Container, Toolbar, Typography } from "@mui/material";
export default function Home() {

    return (
        <Container component={"main"} sx={{ p: 2 }}>
            <Toolbar />
            <Typography variant="body1" sx={{ mb: 2 }}>LiTeX is a formal proof management system that makes expressing and verifying mathematics accessible to EVERYONE. Unlike traditional formal languages that force users to distort their mathematical expressions to fit what the formal language can represent, LiTeX seamlessly bridges the gap between a user’s thought process and the expression of their logic by combining the structured clarity of LaTeX for mathematical notation with Lisp’s philosophy of “Everything is a symbol” (This is also the origin of LiTeX's name: a combination of Lisp semantics and LaTeX syntax).</Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>The current state of LiTeX is that, it requires significantly less typing—about 50% less than LaTeX and 80% less than Lean4 to implement basic set theory, syllogisms, and fundamental natural number theory. For example, I chose to implement the opening chapters of Professor Terrence Tao’s *Analysis I* as a case study. You can see a comparison of Lean4, LaTeX, and LiTeX on the LiTeX website.</Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>The project has been adopted early by several prominent entities, including being used as training material by DeepMath and OpenMMLab, leading Chinese institutions specializing in large mathematical models and language models, and as an interactive textbook by the Department of Mathematics at Fudan University.</Typography>

            <Typography variant="body1" sx={{ mb: 2 }}>It’s exciting to see that, due to its intuitive syntax and shallow learning curve, LiTeX is not just an auxiliary tool but practical for everyday tasks. This opens up the potential for a much larger user base. With its low time cost, LiTeX can transform most mathematics textbooks into interactive ones and translate classical theorems. In the long term, LiTeX will enable large-scale mathematical collaborations, similar to how programmers collaborate on GitHub. Larger, more logically coherent datasets will make mathematical models and rule-based reasoning systems stronger and better at reasoning.</Typography>
        </Container>
    );
}
