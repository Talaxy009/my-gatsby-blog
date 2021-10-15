const fs = require('fs');
const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question('想要创建的目录名：', (slug) => {
	try {
		const path = `${__dirname}/content/blogs/${slug}`;
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path);
		}

		const data = `---\ntitle: \ndate: "${new Date(
			+ new Date() + 8 * 3600 * 1000, // UTC+8
		).toISOString()}"\ndescription: ""\nimg: "img.jpg"\n---`;

		fs.writeFileSync(`${path}/index.md`, data);

		console.log('成功创建 Markdown 文件');
	} catch (error) {
		console.error('创建 Markdown 文件失败\n' + error);
	}

	readline.close();
});
