export default [
  {
    title: "syllogism",
    code: `obj human set
prop intelligent(x human)

know:
    forall x human:
        $intelligent(x)

obj Jordan human
$intelligent(Jordan)`,
  },
  {
    title: "multivariate_linear_equation",
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
  {
    title: "Hilbert_geometry_axioms_formalization",
    code: `# Litex Code Example: Hilbert's Axioms of Geometry

# Below is the Hilbert axioms written in Litex code, along with a one-to-one correspondence with the definitions from Wikipedia. Although the following axioms are recognized as complete, some definitions and facts are implicitly omitted for simplicity. Here, I have made the necessary additions to ensure rigor and clarity.

# Read more about Hilbert's geometry axioms: https://en.wikipedia.org/wiki/Hilbert%27s_axioms .

# Hilbert's axiom system is constructed with six primitive notions: three primitive terms:
# point;
# line;
# plane+
# and three primitive relations:
# Betweenness, a ternary relation linking points;

# Betweenness, a ternary relation linking points;
# Lies on (Containment), three binary relations, one linking points and straight lines, one linking points and planes, and one linking straight lines and planes;
# Congruence, two binary relations, one linking line segments and one linking angles, each denoted by an infix ≅.
# Line segments, angles, and triangles may each be defined in terms of points and straight lines, using the relations of betweenness and containment. All points, straight lines, and planes in the following axioms are distinct unless otherwise stated.

obj point set
obj line set
obj plane set

prop point_on_line(p point, l line)
prop point_on_plane(q point, p plane)
prop line_on_plane(l line, p plane)

# 1. Incidence

# 1. For every two points A and B there exists a line a that contains them both. We write AB = a or BA = a. Instead of "contains", we may also employ other forms of expression; for example, we may say "A lies upon a", "A is a point of a", "a goes through A and through B", "a joins A to B", etc. If A lies upon a and at the same time upon another line b, we make use also of the expression: "The lines a and b have the point A in common", etc.

# 2. For every two points there exists no more than one line that contains them both; consequently, if AB = a and AC = a, where B ≠ C, then also BC = a.

fn line_of(a point, b point) line:
    a != b
    then:
        $point_on_line(a, line_of(a, b))
        $point_on_line(b, line_of(a, b))
        forall l line:
            $point_on_line(a, l)
            $point_on_line(b, l)
            then:
                l = line_of(a, b)

prove:
    # a line is determined by two points
    obj a point, b point, l line:
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)
    l = line_of(a, b)

    # line_of is commutative
    forall a point, b point:
        a != b
        then:
            b != a
            $point_on_line(a, line_of(a, b))
            $point_on_line(b, line_of(a, b))
            $point_on_line(a, line_of(b, a))
            $point_on_line(b, line_of(b, a))
            line_of(a, b) = line_of(b, a)

# Tip: here prove mean "open a local environment and the following content will not affect the outside". It is a good way of doing small tests.

# 3.1. There exist at least two points on a line. 

exist_prop b point st exist_at_least_two_points_on_line(a point, l line):
    $point_on_line(a, l)
    iff:
        $point_on_line(b, l)
        b != a

know forall a point, l line:
    $point_on_line(a, l)
    then:
        $exist_at_least_two_points_on_line(a, l)

prove:
    obj a point, l line:
        $point_on_line(a, l)

    $exist_at_least_two_points_on_line(a, l)

    have b st $exist_at_least_two_points_on_line(a, l)

    $point_on_line(b, l)

# 3.2 There exist at least three points that do not lie on the same line.

know exist_prop c point st exist_one_point_not_on_the_same_line_with_two_points(a point, b point):
    a != b
    iff:
    
        not $point_on_line(c, line_of(a, b))

prove:
    obj a point, b point:
        a != b
    $exist_one_point_not_on_the_same_line_with_two_points(a, b)
    have c st $exist_one_point_not_on_the_same_line_with_two_points(a, b)

# Tip: It's a good and essential habit to name everything properly. I recommend you to use long names which contains all the information in the name. Do not worry about typing, because most IDEs will prompt or complete the rest of the name when you type the first few characters.

# Tip: know prop, know exist_prop is a syntax sugar for making that prop(exist_prop) as an axiom.

# 4. For every three points A, B, C not situated on the same line there exists a plane α that contains all of them. For every plane there exists a point which lies on it. We write ABC = α. We employ also the expressions: "A, B, C lie in α"; "A, B, C are points of α", etc.

# 5. For every three points A, B, C which do not lie in the same line, there exists no more than one plane that contains them all.

fn plain_of(a point, b point, c point) plane:
    a != b
    a != c
    b != c
    not $point_on_line(a, line_of(b, c))
    then:
        $point_on_plane(a, plain_of(a, b, c))
        $point_on_plane(b, plain_of(a, b, c))
        $point_on_plane(c, plain_of(a, b, c))
        forall p plane:
            $point_on_plane(a, p)
            $point_on_plane(b, p)
            $point_on_plane(c, p)
            then:
                p = plain_of(a, b, c)

# Tip: axiom with uniqueness and existence can be written as a function.

# 6. If two points A, B of a line a lie in a plane α, then every point of a lies in α. In this case we say: "The line a lies in the plane α", etc.

know prop two_points_on_line_then_line_on_plane(a point, b point, l line, p plane):
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)
        $point_on_plane(a, p)
        $point_on_plane(b, p)
        iff:
            $line_on_plane(l, p)

prove:
    obj a point, b point, l line, p plane:
        a != b
        $point_on_plane(a, p)
        $point_on_plane(b, p)
        $point_on_line(a, l)
        $point_on_line(b, l)
    $two_points_on_line_then_line_on_plane(a, b, l, p)
    $line_on_plane(l, p)

# 7. If two planes α, β have a point A in common, then they have at least a second point B in common.

know exist_prop b point st two_planes_have_one_common_point_then_they_have_another_common_point(a point, p plane, q plane):
    $point_on_plane(a, p)
    $point_on_plane(a, q)
    iff:
        $point_on_plane(b, p)

prove:
    obj a point, p plane, q plane:
        $point_on_plane(a, p)
        $point_on_plane(a, q)
    $two_planes_have_one_common_point_then_they_have_another_common_point(a, p, q)
    have b st $two_planes_have_one_common_point_then_they_have_another_common_point(a, p, q)
    $point_on_plane(b, p)

# 8. There exist at least four points not lying in a plane.

prop not_on_any_plane(a point, b point, c point, d point):
    forall p plane:
        or:
            not $point_on_plane(a, p)
            not $point_on_plane(b, p)
            not $point_on_plane(c, p)
            not $point_on_plane(d, p)

exist_prop a point, b point, c point, d point st exist_four_points_not_on_any_plane():
    a != b
    a != c
    a != d
    b != c
    b != d
    c != d
    $not_on_any_plane(a, b, c, d)

know $exist_four_points_not_on_any_plane()


prove:
    have a , b , c , d  st $exist_four_points_not_on_any_plane()
    $not_on_any_plane(a, b, c, d)

    forall p plane:
            or:
                not $point_on_plane(a, p)
                not $point_on_plane(b, p)
                not $point_on_plane(c, p)
                not $point_on_plane(d, p)

# 2. Order

# 1. If a point B lies between points A and C, B is also between C and A, and there exists a line containing the distinct points A, B, C.

prop between(left point, right point, middle point):
    dom:
        left != right

know forall left point, right point, middle point:
    left != right
    $between(left, right, middle)
    then:
        $between(right, left, middle)

know exist_prop l line st exist_line_through_three_points(a point, b point, c point):
    a != b
    $between(a, b, c)
    iff:
        a != c
        b != c
        $point_on_line(a, l)
        $point_on_line(b, l)
        $point_on_line(c, l)

prove:
    obj left point, right point, middle point:
        left != right
        $between(left, right, middle)

    $between(right, left, middle)
    $exist_line_through_three_points(left, right, middle)

    have l st $exist_line_through_three_points(left, right, middle)
    $point_on_line(left, l)
    $point_on_line(right, l)
    $point_on_line(middle, l)

# 2. If A and C are two points, then there exists at least one point B on the line AC such that C lies between A and B.

exist_prop right point st exist_point_right_to_given_two_points(left point, middle point):
    left != middle
    iff:
        $between(left, right, middle)

know forall a point, b point:
    a != b
    then:
        $exist_point_right_to_given_two_points(a, b)

prove:
    obj a point, b point:
        a != b

    $exist_point_right_to_given_two_points(a, b)

    have right  st $exist_point_right_to_given_two_points(a, b)

    $between(a, right, b)

# 3. Of any three points situated on a line, there is no more than one which lies between the other two.

know prop no_more_than_one_point_between_three_points_on_line(a point, b point, c point):
    a != b
    a != c
    b != c
    $point_on_line(a, line_of(b, c))
    iff:
        or:
            $between(a, b, c)
            $between(a, c, b)
            $between(b, a, c)
            $between(b, c, a)
            $between(c, a, b)
            $between(c, b, a)

prove:
    obj a point, b point, c point:
        a != b
        a != c
        b != c
        $point_on_line(a, line_of(b, c))

    $no_more_than_one_point_between_three_points_on_line(a, b, c)

    know:
        not $between(a, b, c)
        not $between(a, c, b)
        not $between(b, a, c)
        not $between(b, c, a)
        not $between(c, a, b)
    
    $between(c, b, a)


# 4. Pasch's Axiom: Let A, B, C be three points not lying in the same line and let a be a line lying in the plane ABC and not passing through any of the points A, B, C. Then, if the line a passes through a point of the segment AB, it will also pass through either a point of the segment BC or a point of the segment AC.

obj finite_line set

fn finite_line_of(a point, b point) finite_line:
    a != b
    then:
        $point_on_line(a, finite_line_of(a, b))
        $point_on_line(b, finite_line_of(a, b))

prop line_intersect_finite_line(a point, b point, l line):
    dom:
        a != b

prop line_intersect_line(a point, b point, l line):
    dom:
        a != b
        l != finite_line_of(a, b)

know prop line_intersect_finite_line_then_line_intersect_line(a point, b point, c point, l line):
    dom:
        a != b
        a != c
        b != c
        $line_intersect_finite_line(a, b, l)
    iff:
        or:
            $line_intersect_finite_line(a , c, l)
            $line_intersect_finite_line(b , c, l)

prove:
    obj a point, b point, c point, l line:
        a != b
        a != c
        b != c
        $line_intersect_finite_line(a, b, l)

    $line_intersect_finite_line_then_line_intersect_line(a, b, c, l)

    know not $line_intersect_finite_line(a, c, l)
    $line_intersect_finite_line(b, c, l)

# TODO: There are still many axioms about relationship between finite_line and line not formulated. The user can add them easily at proper places.

# 3. Congruence

# 1. If A, B are two points on a line a, and if A′ is a point upon the same or another line a′, then, upon a given side of A′ on the straight line a′, we can always find a point B′ so that the segment AB is congruent to the segment A′B′. We indicate this relation by writing AB ≅ A′B′. Every segment is congruent to itself; that is, we always have AB ≅ AB.
# We can state the above axiom briefly by saying that every segment can be laid off upon a given side of a given point of a given straight line in at least one way.

prop finite_line_equal(l1 finite_line, l2 finite_line)

# TODO: I am not sure if this formalization is exactly what the axiom means. May $point_on_line(b, l) be removed?
prop point_left_to_point_on_one_line(a point, b point, l line):
    dom:
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)

prop point_right_to_point_on_one_line(a point, b point, l line):
    dom:
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)

know:
    forall a point, b point, l line:
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)
        then:
            or:
                $point_right_to_point_on_one_line(a, b, l)
                $point_left_to_point_on_one_line(a, b, l)

prop point_left_point_on_one_line(a point, b point, l line):
    dom:
        a != b
        $point_on_line(a, l)
        $point_on_line(b, l)

know forall a point, b point, l line:
    a != b
    $point_on_line(a, l)
    $point_on_line(b, l)
    then:
        or:
            $point_left_to_point_on_one_line(a, b, l)
            $point_left_point_on_one_line(a, b, l)

know exist_prop a point st exist_point_left_to_point_with_finite_line_equal_to_given_finite_line(b point, l finite_line):
    iff:
        a != b
        $point_left_to_point_on_one_line(a, b, l)
        $finite_line_equal(finite_line_of(a, b), l)

know exist_prop a point st exist_point_right_to_point_with_finite_line_equal_to_given_finite_line(b point, l finite_line):
        a != b
        $point_left_to_point_on_one_line(b, a, l)
        $finite_line_equal(finite_line_of(a, b), l)
know:
    forall b point, l finite_line:
        $exist_point_left_to_point_with_finite_line_equal_to_given_finite_line(b, l)

know:
    $commutative_prop(finite_line_equal)
    forall a point, b point:
        a != b
        then:
            $finite_line_equal(finite_line_of(a, b), finite_line_of(b, a))

prove:
    obj middle point, l finite_line
    $exist_point_left_to_point_with_finite_line_equal_to_given_finite_line(middle, l)
    have left  st $exist_point_left_to_point_with_finite_line_equal_to_given_finite_line(middle, l)
    $point_left_to_point_on_one_line(left, middle, l)

    left != middle
    $finite_line_equal(finite_line_of(left, middle), l)


# TODO: The user can add relationships between $between, $point_left_to_point_on_one_line, $point_left_point_on_one_line, by himself. 

# Tip: There are 2 builtin keywords for commutative properties: $commutative_prop and $commutative_fn. The verifier will automatically prove a given commutatively if commutative property is true.

# 2. If a segment AB is congruent to the segment A′B′ and also to the segment A″B″, then the segment A′B′ is congruent to the segment A″B″; that is, if AB ≅ A′B′ and AB ≅ A″B″, then A′B′ ≅ A″B″.

know prop finite_line_equal_transitive(l1 finite_line, l2 finite_line, l3 finite_line):
    dom:
        $finite_line_equal(l1, l2)
        $finite_line_equal(l2, l3)
    iff:
        $finite_line_equal(l1, l3)

prove:
    obj l1 finite_line, l2 finite_line, l3 finite_line:
        $finite_line_equal(l1, l2)
        $finite_line_equal(l2, l3)
    $finite_line_equal_transitive(l1, l2, l3)
    $finite_line_equal(l1, l3)

# 3. Let AB and BC be two segments of a line a which have no points in common aside from the point B, and, furthermore, let A′B′ and B′C′ be two segments of the same or of another line a′ having, likewise, no point other than B′ in common. Then, if AB ≅ A′B′ and BC ≅ B′C′, we have AC ≅ A′C′.

prop on_one_line(a point, b point, c point):
    a != b
    a != c
    b != c
    iff:
        $point_on_line(a, line_of(b, c))

# This fact could be proved by other axioms, but I know it anyway.
know:
    forall a point, b point, c point:
        a != b
        a != c
        b != c
        $on_one_line(a, b, c)
        then:
            $on_one_line(a, c, b)
            $on_one_line(b, a, c)
            $on_one_line(b, c, a)
            $on_one_line(c, a, b)
            $on_one_line(c, b, a)

know prop addition_keeps_equal_of_finite_lines(a point, b point, c point, a2 point, b2 point, c2 point):
    $on_one_line(a, b, c)
    $on_one_line(a2, b2, c2)
    $finite_line_equal(finite_line_of(a, b), finite_line_of(a2, b2))
    $finite_line_equal(finite_line_of(b, c), finite_line_of(b2, c2))
    iff:
        $finite_line_equal(finite_line_of(a, c), finite_line_of(a2, c2))

prove:
    obj a point, b point, c point, a2 point, b2 point, c2 point:
        $on_one_line(a, b, c)
        $on_one_line(a2, b2, c2)
        a != b
        a != c
        b != c
        a2 != b2
        a2 != c2
        b2 != c2
        $finite_line_equal(finite_line_of(a, b), finite_line_of(a2, b2))
        $finite_line_equal(finite_line_of(b, c), finite_line_of(b2, c2))

    $addition_keeps_equal_of_finite_lines(a, b, c, a2, b2, c2)

    $finite_line_equal(finite_line_of(a, c), finite_line_of(a2, c2))

# 4. Let an angle ∠ (h,k) be given in the plane α and let a line a′ be given in a plane α′. Suppose also that, in the plane α′, a definite side of the straight line a′ be assigned. Denote by h′ a ray of the straight line a′ emanating from a point O′ of this line. Then in the plane α′ there is one and only one ray k′ such that the angle ∠ (h, k), or ∠ (k, h), is congruent to the angle ∠ (h′, k′) and at the same time all interior points of the angle ∠ (h′, k′) lie upon the given side of a′. We express this relation by means of the notation ∠ (h, k) ≅ ∠ (h′, k′).

# TODO: It seems to me that the proposition itself is not that clear. I formalize it in my own understanding.

obj ray set
obj half_plane set
obj angle set

prop point_on_ray(a point, r ray)

fn ray_with_end_point_and_direction(a point, b point) ray:
    dom:
        a != b

prop half_plane_left_to_ray(a point, r ray, p half_plane):
    dom:
        $point_on_ray(a, r)

prop half_plane_right_to_ray(a point, r ray, p half_plane):
    dom:
        $point_on_ray(a, r)

fn angle_of_two_rays_with_the_same_start_point(a point, r1 ray, r2 ray) angle:
    $point_on_ray(a, r1)
    $point_on_ray(a, r2)
    forall x point:
        $point_on_ray(x, r1)
        $point_on_ray(x, r2)
        then:
            x = a

prop angle_equal(ang1 angle, ang2 angle)

prop half_plane_to_ray(a point, r ray, p half_plane):
    $point_on_ray(a, r)
    or:
        $half_plane_left_to_ray(a, r, p)
        $half_plane_right_to_ray(a, r, p)

know exist_prop r2 ray st exist_a_ray_with_the_same_angel_with_given_ray_and_half_plane(a point, r1 ray, p half_plane, ang angle):
    dom:
        $point_on_ray(a, r1)
        $half_plane_to_ray(a, r1, p)
    iff:    
        $angle_equal(angle_of_two_rays_with_the_same_start_point(a, r1, r2), ang)

# TODO: Write some tests for this.

# 5. If the angle ∠ (h, k) is congruent to the angle ∠ (h′, k′) and to the angle ∠ (h″, k″), then the angle ∠ (h′, k′) is congruent to the angle ∠ (h″, k″); that is to say, if ∠ (h, k) ≅ ∠ (h′, k′) and ∠ (h, k) ≅ ∠ (h″, k″), then ∠ (h′, k′) ≅ ∠ (h″, k″).

know prop angle_equal_transitive(ang1 angle, ang2 angle, ang3 angle):
    dom:
        $angle_equal(ang1, ang2)
        $angle_equal(ang2, ang3)
    iff:
        $angle_equal(ang1, ang3)

know:
    $commutative_prop(angle_equal)

prove:
    obj ang1 angle, ang2 angle, ang3 angle:
        $angle_equal(ang1, ang2)
        $angle_equal(ang2, ang3)
    $angle_equal_transitive(ang1, ang2, ang3)
    $angle_equal(ang1, ang3)

# 6. If, in the two triangles ABC and A′B′C′ the congruences AB ≅ A′B′, AC ≅ A′C′, ∠BAC ≅ ∠B′A′C′ hold, then the congruence ∠ABC ≅ ∠A′B′C′ holds (and, by a change of notation, it follows that ∠ACB ≅ ∠A′C′B′ also holds).

obj triangle set

fn triangle_of_points(a point, b point, c point) triangle:
    dom:
        a != b
        a != c
        b != c

prop triangle_equal(t1 triangle, t2 triangle)

fn angle_of_points(a point, b point, c point) angle:
    dom:
        a != b
        a != c
        b != c

know forall a point, b point, c point:
    a != b
    a != c
    b != c
    then:
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(a, b, c))
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(a, c, b))
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(b, a, c))
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(b, c, a))
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(c, a, b))
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(c, b, a))

know prop triangle_equal_by_two_sides_and_included_angle_equal(a point, b point, c point, a2 point, b2 point, c2 point):
    dom:
        a != b
        a != c
        b != c
        a2 != b2
        a2 != c2
        b2 != c2
        $finite_line_equal(finite_line_of(a, b), finite_line_of(a2, b2))
        $finite_line_equal(finite_line_of(b, c), finite_line_of(b2, c2))
        $angle_equal(angle_of_points(a, b, c), angle_of_points(a2, b2, c2))
    iff:
        $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(a2, b2, c2))
prove:
    obj a point, b point, c point, a2 point, b2 point, c2 point:
        a != b
        a != c
        b != c
        a2 != b2
        a2 != c2
        b2 != c2
        $finite_line_equal(finite_line_of(a, b), finite_line_of(a2, b2))
        $finite_line_equal(finite_line_of(b, c), finite_line_of(b2, c2))
        $angle_equal(angle_of_points(a, b, c), angle_of_points(a2, b2, c2))

    $triangle_equal_by_two_sides_and_included_angle_equal(a, b, c, a2, b2, c2)
    $triangle_equal(triangle_of_points(a, b, c), triangle_of_points(a2, b2, c2))

# 4. Parallel

# 1. Playfair's axiom: Let a be any line and A a point not on it. Then there is at most one line in the plane, determined by a and A, that passes through A and does not intersect a.

prop point_on_line1_then_not_on_line2(a point, l1 line, l2 line):
    dom:
        $point_on_line(a, l1)
    iff:
        not $point_on_line(a, l2)

prop parallel(l1 line, l2 line):
    forall x point:
        $point_on_line1_then_not_on_line2(x, l1, l2)
    
    forall x point:
        $point_on_line1_then_not_on_line2(x, l2, l1)

know exist_prop l2 line st exist_one_and_only_one_line_through_point_not_intersect_line(a point, l line):
    dom:
        not $point_on_line(a, l)
    iff:
        $point_on_line(a, l2)
        $parallel(l, l2)

prove:
    obj a point, l line:
        not $point_on_line(a, l)

    $exist_one_and_only_one_line_through_point_not_intersect_line(a, l)
    have l2 st $exist_one_and_only_one_line_through_point_not_intersect_line(a, l)
    $point_on_line(a, l2)
    $parallel(l, l2)

# 5. Continuity

# 1. Axiom of Archimedes: If AB and CD are any segments then there exists a number n such that n segments CD constructed contiguously from A, along the ray from A through B, will pass beyond the point B.

fn finite_line_of_direction_and_length(a point, b point, n R) finite_line:
    dom:
        a != b
        n > 0

fn length_of_finite_line(l finite_line) R

prop in_the_same_direction(a point, b point, c point):
    dom:
        a != b
        a != c
        b != c
        $on_one_line(a, b, c)

know forall a point, b point, c point:
    a != b
    a != c
    b != c
    $on_one_line(a, b, c)
    $in_the_same_direction(a, b, line_of(a, b))
    $point_left_to_point_on_one_line(a, b, line_of(a, b))
    then:
        $point_left_to_point_on_one_line(a, c, line_of(a, b))

know forall a point, b point, c point:
    a != b
    a != c
    b != c
    $on_one_line(a, b, c)
    $in_the_same_direction(a, b, line_of(a, b))
    $point_right_to_point_on_one_line(a, b, line_of(a, b))
    then:
        $point_right_to_point_on_one_line(a, c, line_of(a, b))
    
know exist_prop n R, c point st exist_finite_line_of_direction_and_length(a point, b point, l finite_line):
    n > 0
    $point_on_line(c, line_of(a, b))
    line_of(a, c) = n * length_of_finite_line(l)
    $in_the_same_direction(a, b, c)

# 2. Axiom of line completeness: An extension (An extended line from a line that already exists, usually used in geometry) of a set of points on a line with its order and congruence relations that would preserve the relations existing among the original elements as well as the fundamental properties of line order and congruence that follows from Axioms I-III and from V-1 is impossible.

# Completeness are actually dealing with real numbers. The keyword R is used to represent real numbers in Litex. Their properties will be implemented as part of the standard library in the future.

# All the axioms are formalized except the axiom of line completeness, which will be implemented as part of the standard library in the future.

# End of the Formalization.`,
  },
  {
    title: "terence_tao_analysis_one",
    code: `# Chapter 2: Starting from the beginning: the natural numbers

# This file formalizes natural numbers axioms in chapter 2 of Analysis I, with explanations and examples.

# Axiom 2.1 0 is a natural number.

# The fact that literals are symbols for natural numbers within the set of natural numbers is built-in.
# N, Z, Q, R, C are built-in sets: the set of natural numbers, integers, rational numbers, real numbers, and complex numbers. Some of their properties are built-in, but Litex is flexible enough to allow the user to define and derive their own properties without any problem.

# factual expressions are typically written as $propName(objects). There are 3 handy exceptions: 1. builtin keywords like =, > are written as daily life math 2. If the proposition requires one and only one object, it can be written as "object $propName" 3. If the proposition requires two objects, it can be written as "object1 $propName object2".

0 $in N # This is a factual statement. Its output is true.

# Axiom 2.2 If n is a natural number, then the successor of n is also a natural number.
know forall x N:
    x + 1 $in N

# examples: the followings are true factual statements.
0 + 1 = 1
3 $in N
4 != 0
2 != 6

# Axiom 2.3 0 is not the successor of any natural number.
know forall x N:
    0 != x + 1

# Axiom 2.4 If two natural numbers are equal, iff their successors are equal.
know forall x N, y N:
    x != y
    iff:
        x + 1 != y + 1

# Axiom 2.5 Principle of mathematical induction.
# prove_by_induction is a built-in function that takes a predicate and a natural number and returns true if the predicate is true for all natural numbers up to and including the natural number.
# The user actually can use "prove_by_induction" + "there exists the smallest natural number" to prove the principle of mathematical induction. In this case, he does not need to use the builtin keyword "prove_by_induction" to use "prove_by_induction" to prove correctness of a statement.

# define a random proposition
prop random_proposition(n N)

# know it satisfies the condition of the principle of mathematical induction
know:
    $random_proposition(0)
    forall n N:
        $random_proposition(n)
        then:
            $random_proposition(n + 1)

# use "prove_by_math_induction" to prove random_proposition is true for all natural numbers larger than 0
prove_by_math_induction random_proposition 0

# verify: $random_proposition(n) is true for all n N
forall n N:
    n >= 0
    then:
        $random_proposition(n)

# Assumption 2.6 There exists a number system N. Set N is built-in.

# Proposition 2.1.16 Recursive definition. The definition of recursion in this book is sort of confusing and informal because f(n)(a_{n}) is defined by a_{n}, but what is a_{n}? A sequence is not a set, because there might exists equal elements in a sequence. If a sequence is a function from N to N, then why do we need a function f(n) to define a function from N to N to make sure f(n)(a_{n}) = a_{n}? a_{n} itself is already that function which satisfies the condition a_{n} = a_{n}.

# Since addition and multiplication is so common in math, their basic properties are builtin in Litex. For example, Litex automatically checks equality of two polynomials by builtin expansion and combination.

# Addition of natural numbers.
forall x N, y N:
    (x + y) + 1 = (x + 1) + y

forall x N:
    0 + x = x

# Addition is commutative
forall x N, y N:
    x + y = y + x

# Addition is associative
forall x N, y N, z N:
    (x + y) + z = x + (y + z)

# Definition 2.2.1: a is positive if a != 0.
prop is_positive_natural_number(n N):
    n != 0

# Proposition 2.2.8: If a is positive, b is natural number, then a + b is positive.
know forall a N, b N:
    a != 0
    then:
        a + b != 0

# Corollary 2.2.9: If a and b are natural numbers such that a + b = 0, then a = 0 and b = 0.
know forall a N, b N:
    a + b = 0
    then:
        a = 0
        b = 0

# Lemma 2.2.10: If a is positive, then there exists exactly one natural number b such that b + 1 = a.
forall a N:
    (a - 1) + 1 = a

# Proposition 2.2.11: If n and m are natural numbers. We say n is greater than or equal to m, written n >= m, if n = m + k for some natural number k. We say n is strictly greater than m, written n > m, if n >= m and n != m.

# Definition 2.3.1 multiplication of natural numbers.
forall x N:
    0 * x = 0

forall x N, y N:
    (x + 1) * y = x * y + y

# Multiplication is commutative
forall x N, y N:
    x * y = y * x

# Multiplication is associative
forall x N, y N, z N:
    (x * y) * z = x * (y * z)

# Distributive law
forall x N, y N, z N:
    x * (y + z) = x * y + x * z

# 0 is the multiplicative identity
forall x N:
    0 * x = 0

# 1 is the multiplicative identity
forall x N:
    1 * x = x


# Chapter 3: Set theory

# This file formalizes set theory axioms in chapter 3 of Analysis I, with explanations and examples.

# Axiom 3.1 If A is a set, then A is an object. In particular, given two sets A and B, it is meaningful to ask whether A in B.
# "in" and "set" are built-in keywords. They behave in Litex just like how they behave in daily math (naive set theory).
# "obj" is a built-in keyword in Litex for declaring objects. Also, anything declared object (things that are not declared as prop or exist_prop) is an object (writes xxx $in obj). obj itself is not obj.
# The word "object" every now and then in Analysis I without any definition. It sort to reveals that explanations of basic elements in math are still missing in this book (or maybe in math world in general). The keyword "obj" in Litex is really something aligns with the word "object" means in math with Litex creators's understanding.

forall s set:
    s $in obj

# Definition 3.1.4: Set A is equal to set B, written A = B, if and only if every element of A is an element of B and every element of B is an element of A.
know forall A , B set:
    A = B
    iff:
        forall x A:
            x $in B
        forall x B:
            x $in A

# Axiom 3.2: There exists a set which contains no elements
know exist_prop empty_set set st exist_empty_set():
    forall x obj:
        not $in(x, empty_set)

# Axiom 3.3: a is an object, then there exists a set A such that A contains and only contains a. If a and b are objects, then there exists a set A such that A contains and only contains a and b.
know exist_prop s set st exist_set_contains_and_only_contains_obj(a obj):
    forall x s:
        x = a
    a $in s

# Axiom 3.4: Definition of union of two sets.
fn union(A, B set) set:
    forall x A:
        x $in union(A, B)
    forall x B:
        x $in union(A, B)
    forall x union(A, B):
        or:
            x $in A
            x $in B

# Definition of subset.
prop is_subset_of(A, B set):
    forall x A:
        x $in B

# Axiom 3.5: Axiom of specification. If A is a set and P is a property, then there exists a set B such that B contains and only contains the elements of A that satisfy P.
# In Litex you can specify a set very flexibly.
prove:
    obj s2 set # define a random set
    prop property_of_s2_items(x s2) # define a property of the elements of s2
    
    # TODO: Litex will provide the user a syntax sugar for defining a set by a property. Now we use the idea of "if and only if" to define a set by a property.
    obj s set: # define s = {x in s2| property_of_s2_items(x) is true}
        s $is_subset_of s2
        forall x s:
            $property_of_s2_items(x)
        forall x s2:
            $property_of_s2_items(x)
            then:
                x $in s
    
# TODO: Axiom 3.6 solves the problem of exist and only exist. But it is second-order logic. Since early versions of Litex does not support second-order logic for user, Litex will make it as built-in. The reason why early versions of Litex does not support second-order logic is that most math is based on first-order logic and the creator does not want to make it too complex for user. Second-order-logic is still a "match and substitute" logic (but, first order logic only match and substitute objects inside parameter list of a proposition, second order logic can match and substitute the name of that proposition.), but in order to keep the language simple, Litex needs another set of language features to make it independent from the main logic of "first-order logic" which is the default logic of Litex (the new system is similar to first-order logic, but you have to give a name to any universal fact with proposition as parameter because ordinary universal fact can not take proposition as parameter). Implementing and designing it is a matter of time, not something fundamental.
# Designing a proper syntax and semantics is tricky. Unlike another piece of logic, prove by math induction, which is a second-order logic, axiom of replacement is not that easy to implement. The inventor could implement it now, but he refuses to do so until he finds a way to make it more user-friendly. For the time being, the user can by default assume axiom of replacement is true and declare new sets whose existence is guaranteed by axiom of replacement. Again this is a matter of time, not something fundamental.

# Axiom 3.7: There exists a set N whose elements have properties defined in chapter 2.
# N is built-in in Litex. Most of the properties of N are also built-in. The user can also define his own properties of N easily.

# Axiom 3.8 is wrong because it leads to Russell's paradox.

# Axiom 3.9 (Regularity) If A is a non-empty set, then there is at least one element of A that is either not a set, or is disjoint from A
prop is_disjoint_from(A obj, B set):
    A $in set
    forall x A:
        not $in(x, B)

exist_prop x A st any_non_empty_set_has_item_that_is_not_a_set_or_is_disjoint_from_A(A set):
    or:
        not $in(x, set) # "x is a set" is written as $in(x, set)
        $is_disjoint_from(x, A)

# Axiom 3.10 (Power set axiom) Let X and Y be sets. Then there exists a set denoted by Y^{X} which contains all functions from X to Y
# keyword "fn_template" is a built-in keyword in Litex for declaring a function template, i.e. a set of functions that satisfy some conditions about its domain and range. This keyword is more powerful and expressive than power set axiom.

# For example, we can declare the set of all functions from natural numbers larger than 10 to real numbers less than 100 as follows:
fn_template fn_from_N_to_N(x N) R:
    dom:
        x > 10
    then:
        fn_from_N_to_N(x) < 100

# Axiom 3.11 (Union axiom) Let X be a set. Then there exists a set denoted by union(X) which contains all elements of the elements of X.
fn union_of_set_in_sets(X set) set:
    forall x X:
        x $in set
    then:
        x $in union_of_set_in_sets(X)

# Chapter 4: Integers and rationals

# This file formalizes integers and rationals axioms in chapter 4 of Analysis I, with explanations and examples.

# Keyword Z is a built-in set in Litex. Here are some basic built-in properties of Z.

Z $in set # Z is a set
1 $in Z
-1 $in Z
forall x N:
    x $in Z

# The following properties about Z are true for real numbers. Since integers are real numbers by builtin-rules automatically, the following facts are all true.

forall x, y, a, b Z: # this is syntax sugar for forall x Z, y Z, a Z, b Z:
    x - y + a - b = (x + a) - (y + b)

forall x, y Z:
    x - y = x + (-y)

forall x Z:
    x + (-x) = 0

forall x Z: # 0 is the additive identity
    x * 0 = 0

# associative law for addition
forall x, y, z Z:
    (x + y) + z = x + (y + z)

# associative law for multiplication
forall x, y, z Z:
    (x * y) * z = x * (y * z)

# distributive law
forall x Z, y Z, z Z:
    x * (y + z) = x * y + x * z

# 0 is the additive identity
forall x Z:
    x + 0 = x

# 1 is the multiplicative identity
forall x Z:
    x * 1 = x

know forall x N:
    x > 0
    then:
        not $in(-x, N)

exist_prop x N st given_int_is_reverse_of_nat(y Z):
    x + y = 0

# Lemma 4.1.5: Every integer is either a natural number or the negative of a natural number.
know forall x Z:
    or:
        x $in N
        $given_int_is_reverse_of_nat(x)

# Use Lemma 4.1.5 to prove that -1 is not a natural number and there is a natural number t such that t + (-1) = 0
not $in(-1, N)
$given_int_is_reverse_of_nat(-1)
have t st $given_int_is_reverse_of_nat(-1)
t + (-1) = 0

# The rationals

# proved by builtin rules for *, +, -, /
forall a, b, c, d R:
    b != 0
    d != 0
    then:
        a / b + c / d = (a * d + b * c) / (b * d)

forall a, b Q:
    a + b = b + a
    a * b = b * a

forall a, b, c Q:
    (a + b) + c = a + (b + c)
    (a * b) * c = a * (b * c)
    a * (b + c) = a * b + a * c
    (a + b) * c = a * c + b * c

forall a Q:
    a + 0 = 0 + a
    a = a + 0
    a + (-a) = 0
    a * 1 = 1 * a

forall a Q:
    a != 0
    then:
        a / a = 1`
  },
  {
    title: "weil_number_theory_for_beginners",
    code: `"""
Basics
"""

forall x R, a R, b R:
    a + x = b
    then:
        a + x - a = b - a
        x = b - a

forall x R, a R, b R:
    a != 0
    a * x = b
    then:
        a * x / a = b / a
        x = b / a

know:
    forall a R, b R:
        b  >  a
        then:
            b - a > 0

    forall a R, b R:
        b > a
        then:
            b >= a 
            b != a

    forall a R, b R:
        b < a
        then:
            a > b

exist_prop x Z st is_divisible_by(b Z, a Z):
    a * x = b

prop is_smallest_element_of(x N, s set):
    dom:
        forall y s:
            y $in Z
        x $in s
    iff:
        forall y s:
            y >= x

exist_prop x obj st non_empty(s set):
    x $in s

know exist_prop x N st exist_smallest_element_of(s set):
    dom:
        $non_empty(s)
        forall y s:
            y $in Z
    iff:
        x $in s
        $is_smallest_element_of(x, s)
    
know forall x Z, y Z:
    x * y $in Z
    x + y $in Z
    x - y $in Z

know forall x N, y N:
    x + y $in N
    x * y $in N

know forall x N, y N:
    x + y $in N
    x * y $in N


 """
Chapter 1
"""

# Handy builtin rules are there for verifying basic properties of real numbers.
prove:
    obj x R, y R, z R
    (x + y) + z = x + (y + z)
    x + y = y + x
    0 + x = x
    (x*y)*z = x*(y*z)
    x*y = y*x
    1*x = x
    x*(y+z) = x*y + x*z

know:
    forall a Z, b Z:
        a - b $in Z
        a + b $in Z
        a * b $in Z

    forall a Q, b Q:
        a - b $in Q
        a + b $in Q
        a * b $in Q

    forall a Q, b Q:
        a != 0
        then:
            b / a $in Q

"""
Chapter 2
"""

# Lemma 2.1

# TODO: THIS CLAIM CAN BE PROVED
know exist_prop q Z st exist_largest_multiple_of(d Z, a Z):
    iff:
        a >= d * q
        d*(q+1) > a

# Theorem 2.1

# TODO: THIS CLAIM CAN BE PROVED
know exist_prop m N st nonempty_set_of_integers_closed_under_addition_has_elements_divisible_by_a_common_divisor(s set):
    dom:
        $non_empty(s)
        forall x s:
            x $in Z
    iff:
        forall x s:
            x $in Z
            $is_divisible_by(m, x)

# Corollary 2.1
# Specialized case

# Define integral linear combination of two integers

exist_prop c Z, d Z st is_linear_combination_of_two_integers(x Z, a Z, b Z):
    x = c * a + d * b

## 可能可以给用户一个语法糖，让他们能更轻松地让下面这两个定义合并

fn set_of_integer_linear_combination_of_two_integers(a Z, b Z) set:
    forall x set_of_integer_linear_combination_of_two_integers(a, b):
        x $in Z
        $is_linear_combination_of_two_integers(x, a, b)

know:
    forall x Z, a Z, b Z:
        $is_linear_combination_of_two_integers(x, a, b)
        then:
            x $in set_of_integer_linear_combination_of_two_integers(a, b)

fn set_of_multiples_of(d N) set:
    forall x set_of_multiples_of(d):
        x $in Z
        x $is_divisible_by d

know:
    forall x Z, d N:
        x $is_divisible_by d
        then:
            x $in set_of_multiples_of(d)

know:
    forall x Z, d N:
        x $in set_of_multiples_of(d)
        then:
            x $is_divisible_by d

# Corollary itself

# 存在唯一性所以用fn
# 事实上这就是gcd的定义
# Definition 1 at page 7
fn gcd(a Z, b Z) N:
    set_of_multiples_of(gcd(a, b)) = set_of_integer_linear_combination_of_two_integers(a, b)
    
# Corollary 2.2
# Specialized case

know forall a Z, b Z, d Z:
    d != 0
    a $is_divisible_by d
    b $is_divisible_by d
    then:
        gcd(a, b) $is_divisible_by d

"""
Chapter 3
"""

# Definition 3.1
prop relatively_prime(a Z, b Z):
    gcd(a, b) = 1

exist_prop c Z, d Z st exist_relatively_prime(a Z, b Z):
    a * c + b * d = 1

# Theorem 3.1
know forall a Z, b Z:
    gcd(a, b) = 1
    iff:
        $exist_relatively_prime(a, b)

# Corollary 3.1
know forall a Z, b Z:
    dom:
        a != 0
        b != 0
    then:
        a / gcd(a, b) $in Z
        b / gcd(a, b) $in Z
        gcd(a / gcd(a, b), b / gcd(a, b)) = 1

# facts that are not mentioned but still used
know forall a Z, b Z, d Z:
    a $is_divisible_by d
    b $is_divisible_by d
    then:
        a + b $is_divisible_by d
        a - b $is_divisible_by d
        a * b $is_divisible_by d

# Theorem 3.2
know forall a Z, b Z, d Z:
    gcd(a, d) = 1
    a*b $is_divisible_by d
    then:
        b $is_divisible_by d

# Corollary 3.1
know forall a Z, b Z, d Z:
    gcd(a, b) = 1
    gcd(a, d) = 1
    then:
        gcd(a, b*d) = 1

`
  },
  {
    title: "sqrt_2_is_irrational",
    code: `fn logBase(x, y N) N:
    dom:
        y != 0

know forall x, y, z N:
    logBase(x^y, z) = y * logBase(x, z)
    logBase(x*y, z) = logBase(x, z) + logBase(y, z)

know forall x N:
    logBase(x, x) = 1

claim:
    not sqrt(2) $in Q
    prove_by_contradiction:
        have x, y st $rational_number_representation_in_fraction(sqrt(2))
        
        x = sqrt(2) * y
        x ^ 2 = (sqrt(2) ^ 2) * (y ^ 2)
        sqrt(2) ^ 2 = 2 # must write it out
        x ^ 2 = 2 * (y ^ 2)
        logBase(x ^ 2, 2) = logBase(2 * (y ^ 2), 2)
        
        logBase(x ^ 2, 2) = 2 * logBase(x, 2)
        logBase(y ^ 2, 2) = 2 * logBase(y, 2)

        logBase(2 * (y ^ 2), 2) = logBase(2, 2) + logBase(y ^ 2, 2)
        logBase(2, 2) = 1
        logBase(2 * (y ^ 2), 2) = 1 + logBase(y ^ 2, 2)

        logBase(x ^ 2, 2) = 1 + 2 * logBase(y, 2)
        2 * logBase(x, 2) = 1 + 2 * logBase(y, 2)

        (2 * logBase(x, 2)) % 2 = (1 + 2 * logBase(y, 2)) % 2
        (2 * logBase(x, 2)) % 2 = 0
        0 = (1 + 2 * logBase(y, 2)) % 2

        (1 + 2 * logBase(y, 2)) % 2 = 1 % 2 + (2 * logBase(y, 2)) % 2
        1 % 2 + (2 * logBase(y, 2)) % 2 = 1 + 0
        0 = 1`
  },
  {
    title: "Z_R_is_group",
    code: `prop is_group(s set, mul fn(s, s)s, inv fn(s)s, e s):
    forall x s, y s, z s:
        mul(mul(x, y), z) = mul(x, mul(y, z))
    forall x s:
        mul(x, inv(x)) = e
        mul(inv(x), x) = e

fn inverse(x R)R:
    inverse(x) + x = 0

forall x R:
    inverse(x) + x = 0
    x + inverse(x) = 0

forall x Z:
    x + inverse(x) = 0
    inverse(x) = -x
    -x $in Z
    inverse(x) $in Z

$is_group(R, +, inverse, 0)
$is_group(Z, +, inverse, 0)`
  }
];
