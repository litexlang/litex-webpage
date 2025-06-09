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
  {
    title: "Hilbert_geometry_axioms_formalization.lix",
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

set point
set line
set plane

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
        $point_on_line(b, l)

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

exist_prop a point, b point, c point, d point st exist_four_points_not_on_any_plane():
    a != b
    a != c
    a != d
    b != c
    b != d
    c != d
    $not_on_any_plane(a, b, c, d)

know $exist_four_points_not_on_any_plane()

prop not_on_any_plane(a point, b point, c point, d point):
    forall p plane:
        or:
            not $point_on_plane(a, p)
            not $point_on_plane(b, p)
            not $point_on_plane(c, p)
            not $point_on_plane(d, p)

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

set finite_line

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
    $commutative_fn(line_of)
    $commutative_fn(finite_line_of)
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

set ray
set half_plane
set angle

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

set triangle

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

prop parallel(l1 line, l2 line):
    forall x point:
        $point_on_line1_then_not_on_line2(x, l1, l2)
    
    forall x point:
        $point_on_line1_then_not_on_line2(x, l2, l1)


prop point_on_line1_then_not_on_line2(a point, l1 line, l2 line):
    dom:
        $point_on_line(a, l1)
    iff:
        not $point_on_line(a, l2)

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
];
