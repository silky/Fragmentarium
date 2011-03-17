#info Octahedron Distance Estimator (Syntopia 2010)
#include "DE-Raytracer.frag"
#include "MathUtils.frag"
#group Octahedron
// Based on Knighty's Kaleidoscopic IFS 3D Fractals, described here:
// http://www.fractalforums.com/3d-fractal-generation/kaleidoscopic-%28escape-time-ifs%29/

uniform float Scale; slider[0.00,2,4.00]

uniform vec3 Offset; slider[(0,0,0),(1,0,0),(1,1,1)]

uniform float Angle1; slider[-180,0,180]
uniform vec3 Rot1; slider[(-1,-1,-1),(1,1,1),(1,1,1)]
uniform float Angle2; slider[-180,0,180]
uniform vec3 Rot2; slider[(-1,-1,-1),(1,1,1),(1,1,1)]


mat3 fracRotation2;
mat3 fracRotation1;

void init() {
	fracRotation2 = rotationMatrix3(normalize(Rot2), Angle2);
	fracRotation1 = rotationMatrix3(normalize(Rot1), Angle1);
}

// Number of fractal iterations.
uniform int Iterations;  slider[0,13,100]

// The fractal distance estimation calculation
float DE(vec3 z)
{
	float r;
	
	// Iterate to compute the distance estimator.
	int n = 0;
	while (n < Iterations) {
		z *= fracRotation1;
		
		if (z.x+z.y<0.0) z.xy = -z.yx;
		if (z.x+z.z<0.0) z.xz = -z.zx;
		if (z.x-z.y<0.0) z.xy = z.yx;
		if (z.x-z.z<0.0) z.xz = z.zx;
		
		z = z*Scale - Offset*(Scale-1.0);
		z *= fracRotation2;
		
		r = dot(z, z);
             orbitTrap = min(orbitTrap, abs(vec4(z,r)));
		
		n++;
	}
	
	return (length(z) ) * pow(Scale, -float(n));
}

#preset Default
FOV = 0.4
Eye = -0.91199,-2.42234,0.247336
Target = 2.35017,6.98029,-0.726773
Up = -0.909443,0.284621,-0.298287
AntiAlias = 1
AntiAliasBlur = 1
Detail = -1.68616
DetailNormal = -2.55773
FudgeFactor = 0.916
MaxRaySteps = 112
MaxRayStepsDiv = 2.88
BoundingSphere = 2
Dither = 0.5
AO = 0,0,0,0.96721
Specular = 1.4167
SpecularExp = 18.8
SpotLight = 1,1,1,0.17391
SpotLightDir = 0.31428,0.1
CamLight = 1,1,1,1.41936
Glow = 0.835294,0.0784314,0.0784314,0
Fog = 0
BaseColor = 1,1,1
OrbitStrength = 0.515
X = 0.6,0.0117647,0.0117647,0.59056
Y = 1,0.6,0,0.44882
Z = 1,1,1,0.49606
R = 0.666667,0.666667,0.498039,0.07936
BackgroundColor = 0.666667,0.666667,0.498039
GradientBackground = 0.3
Scale = 2
Offset = 1,0,0
Angle1 = 0
Rot1 = 1,1,1
Angle2 = 0
Rot2 = 1,1,1
Iterations = 13
#endpreset

