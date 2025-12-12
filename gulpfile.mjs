import gulp from 'gulp';
const { src, dest } = gulp;

function buildIcons() {
	return src('nodes/**/*.{png,svg}')
		.pipe(dest('dist/nodes'));
}

export { buildIcons as 'build:icons' };

