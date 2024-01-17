import { Flex, Image, Rate } from "antd";

export default function GridCard() {
  const courses = [
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VRUV8dKcf0C-rPjFKCTXc7bZCtU7Ct5j6w3GLN7gGEv2Aad6TlMH0NqM-WIYzhQUMBvKnUfRKE4Le~WZumcfgWX0MjvX68YXdVSho7IUsTfFB0K1RJ8Bubaiq~u-UM8-XtptgLSHKQ9XpaXsYais~L0lLksOJZUPym1YWXHRMIpXkyPN2obuK3HR5xuNPfrawoALNs4A195HTQmmYQ3CGkBpvQIdIioEzS23pnZLdiU0QAbdliboPbAkODRYVIxRM6yLrpdvHcSlEVuYmj~zf7myCcZU~ikeQjlnQX0mECeRnwCjYO5T73r4MnMhRCmGtePRXMYisnpP7uNKD9FyjA__",
    "https://s3-alpha-sig.figma.com/img/7530/0eb8/071b4f3e67fed64422d6928dc595e8d0?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PD9DMIwxegDxAYJ~Qj2BsYAyyLcsHOc-qhhK9D8yEaiIhZcDnh0vuYAuszJldDqnxK5h9x~2Ou8DMevS8leKGwpBWvWjGpunuepNdzXueAEuLg0VHc9PEP-aJcFuErX-LFPH9GmDhqo-g2~LlDeg7jqXq7P~YBSg2fU9skI358bn7e0C7HW-e5wZn61lnmaqz9EWdNoMQHjEOGSt6eDti~eEL6IjAxs72HpnKP5tDYk43jiMB8YQw3c9TxTcLdKN2rwOZw05nY8iRixaeGsqn06LDO6BzA8gTcuZGnUEdWDWGMsVHk7JxPuxmXpwBsrng8iEJw7ly-Xi2vTN7iXOMw__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9e20/b792/ff908e92d7795c318ec7afb91256e344?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ms5QSx7sacZsb4jrkBZ8pYXYZ5ytgRgMT6nMmAgr2XkgxguGbgX1uEN7PjO-42Op0iI4wsr~0SCwRxYY~FQbiorYw7PImK7ULH7qDl~kstjKcp8~onOhlwTVoQE5ZBOSyBY9EOMVQ62tc3dEPMKfD9ippZnPnqkEXj1NjhjNWsGLrWX1mO8MY31Gt9rCTqRLNdz8~VzeQzEtNfKvHYHcZgGO1vFQ8V~Xo7TvcZkdA81kCfwsDgBeeBRYY3ob9OklxQWD7Q-0iRrQ2cx-1NhTqjhdWJtQLtpZyBnDHPICtAk0RJYUfx1TfeQ1gwSh9G1SWNXz8B1lzacLrxBt-cnjxw__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/68b2/bf5d/cf8f6597a2d3d8ecde08aca46bd7302b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EJeKLaKKYLghTSWUtpajFzK9HXCKLWeaTSC5r-46alk4xq~M0AylQWbh3f-fA7vtsM4qwR8DT-Dim6qO~6jfFot5Q2WQl5TCyO5FIG1yRd6pNc84gUIVGxNSIzULyMt4O8lQnR90BCv1thu59N8fZecu4Ri2orjRUZoQM42OLxtko3tz01PW8hGxs9-tvxHCcYQQXMDOMSrgihaojX7re26HTwffpMqbqOBBtoKlXEhX9poRl05Z3mufVJPoITc5vdw6ZzBBYujNeQG950HMRsyO0F-yaMHJht6IuvIYT7DZw5WT2sgDDMTgFKsMJgkkLZTPZ0fW2M25iK9a4-LuxQ__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/9436/2ae7/58db11aaafdacef50118de8cfe45816f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iiykxF~mnnbk59Xzng0C7sDgTqDSTL3MB0u4hWkXhFiNOxzPc1roir~9IP0ydGG2It1vwVyb96sZSPGiPKs0WfPeQ4GfWeB~DbqIIECSs-TWQxvaNEpQLl2I3VlgZ2Jl5LQ7K11EDj~a4DjSVC976cFqHt-MvUew29WXGWfTy4l5ZDp9GXUVqGPlFGl~U5LoLvNTSQza6zVSVdmn5RFKwNWzIv2JaZy2dXlxvReusKcOygPFRXy-fzyL5kH12sXxe0vUuGoK6Ytyh3qLZV08pzWTMlkV9u~MT-SJtBVUTKcTCdipOVC4IuTQuE8iFnPpl~enUNFsGuq9fQuro9yo4A__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/b941/5962/a237174677c55d963a86f68d5a178d5f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j~O6d1DNe0udTsSiJNy10p9bPEYpEdBCu8JWKc1mqMscecT-pDCK8Ln43M4JLecaWv3f5W3aw~3qNE7v4VlHxWAKJqQ4zRALT5Jnx3ERbS0cqnxhTbjl9ZmzHiYdJbxDRtS8-KoTjsQuc7fb9HGRdMa8Mj1LbbIAjdMgNDMmoPr0DfT-4uk3OqjubCbk7U2LudTvxYgmw5rnJuoMYvuWB0jKupkMJmg8Wa~BgtyX2uxuJbQpJIkerzRaSZ5WnHv0nb8p9zI0fh1YqfTXRyo96r4lMHQauSxGTYcQ2mo65mJHOpZ4kWZVgzY-GXRQlyunx0-Mu4FO-zou9UNbt~Ycag__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/b941/5962/a237174677c55d963a86f68d5a178d5f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j~O6d1DNe0udTsSiJNy10p9bPEYpEdBCu8JWKc1mqMscecT-pDCK8Ln43M4JLecaWv3f5W3aw~3qNE7v4VlHxWAKJqQ4zRALT5Jnx3ERbS0cqnxhTbjl9ZmzHiYdJbxDRtS8-KoTjsQuc7fb9HGRdMa8Mj1LbbIAjdMgNDMmoPr0DfT-4uk3OqjubCbk7U2LudTvxYgmw5rnJuoMYvuWB0jKupkMJmg8Wa~BgtyX2uxuJbQpJIkerzRaSZ5WnHv0nb8p9zI0fh1YqfTXRyo96r4lMHQauSxGTYcQ2mo65mJHOpZ4kWZVgzY-GXRQlyunx0-Mu4FO-zou9UNbt~Ycag__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/b941/5962/a237174677c55d963a86f68d5a178d5f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j~O6d1DNe0udTsSiJNy10p9bPEYpEdBCu8JWKc1mqMscecT-pDCK8Ln43M4JLecaWv3f5W3aw~3qNE7v4VlHxWAKJqQ4zRALT5Jnx3ERbS0cqnxhTbjl9ZmzHiYdJbxDRtS8-KoTjsQuc7fb9HGRdMa8Mj1LbbIAjdMgNDMmoPr0DfT-4uk3OqjubCbk7U2LudTvxYgmw5rnJuoMYvuWB0jKupkMJmg8Wa~BgtyX2uxuJbQpJIkerzRaSZ5WnHv0nb8p9zI0fh1YqfTXRyo96r4lMHQauSxGTYcQ2mo65mJHOpZ4kWZVgzY-GXRQlyunx0-Mu4FO-zou9UNbt~Ycag__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/3ce0/6357/114e3a3625a7a92cf1d0ddc6a4b83ede?Expires=1702252800&Signature=MuKzrJ3QSg8Zcm1pk5caCReuFANOGVuOJPaI~YNIa2gPBrhW-pFEvQl1wmnwlLh2oKfWAyVY6RY3vwzDTYammeVB3DEwPLJNBFE7IEmC0SK~8HpDL1X-n~Iv8NJYhsdcexAPsO7efGujMAZscFeJDzIIUyGl25Rpb9X6-uSLagbO7HBgA3A4DFkXuv3rEGnQhZDHWrjofy44sSXKol~IHl0LRnmZUlYuksXsHIPaCZdvubeiOsI~vt9WHafhSoV1C5hJjXegwHnb5jJVjq3p8v2StDjkUIDIpg7LYQnoq-sa3C69bzZu9z5Nz~ctk7nZUaoVc4uFn~iP3oxZ6eVJmg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
    "https://s3-alpha-sig.figma.com/img/b941/5962/a237174677c55d963a86f68d5a178d5f?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=j~O6d1DNe0udTsSiJNy10p9bPEYpEdBCu8JWKc1mqMscecT-pDCK8Ln43M4JLecaWv3f5W3aw~3qNE7v4VlHxWAKJqQ4zRALT5Jnx3ERbS0cqnxhTbjl9ZmzHiYdJbxDRtS8-KoTjsQuc7fb9HGRdMa8Mj1LbbIAjdMgNDMmoPr0DfT-4uk3OqjubCbk7U2LudTvxYgmw5rnJuoMYvuWB0jKupkMJmg8Wa~BgtyX2uxuJbQpJIkerzRaSZ5WnHv0nb8p9zI0fh1YqfTXRyo96r4lMHQauSxGTYcQ2mo65mJHOpZ4kWZVgzY-GXRQlyunx0-Mu4FO-zou9UNbt~Ycag__",
    "https://s3-alpha-sig.figma.com/img/9b61/0683/1876ff9c0ce280e6f2560575fdaa0064?Expires=1702252800&Signature=bNPcJEeZMHf3aPoDTFh-703bogQIHKMW6ss4wnoYYuWqnv8Y70aLVDBT~psXF161kanMz-beLDL88bZgedRS-Q866UtpziNrlwsZt2RA7L~6wtHAxodgL7MFGRYGlsSOnYXwKon8qDb0cBS9VeeG6lc8Y6upDpWWsHNMtQdHEeJWHgHYFii7TuBDGh-HH9ez9fcbVr0pQHF54kcgC7XKbDjv1RJRAek1Il0Ufi6ULnSG9Y5O4Q4Z-jgKn6aZC2jE6kTPKPkmT8mcA1u4zhN17mA7AoB87Gd7anEbhArhxjLZD6zO9EcqHd9vWMwqQcwgsw9xHUSvt67wgb8IGZ7upg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  ];

  const getCardContent = () => {
    return (
      <>
        <div
          className="card-overlay-wrapper h-100 small-content"
          style={{ padding: 0 }}
        >
          <Flex
            vertical
            className="h-100"
            justify="space-between"
            style={{ padding: "1.5rem" }}
          >
            <Flex>
              <span className="card-chip font-bold">New Topic</span>
            </Flex>
            <Flex vertical align="baseline">
              <span className="card-course-title">
                Leadership and Business Management
              </span>
              <span className="sub-header font-bold">
                International Leadership
              </span>
            </Flex>
          </Flex>
        </div>
        <div
          className="card-overlay-wrapper large-content h-100"
          style={{ padding: 0 }}
        >
          <Flex
            vertical
            className="h-100"
            justify="space-between"
            style={{ padding: "1.5rem" }}
          >
            <Flex>
              <span className="card-chip font-bold">New Topic</span>
            </Flex>
            <Flex vertical gap={"1rem"}>
              <Rate allowHalf disabled defaultValue={4.5} />
              <div className="font-sm font-bold text-uppercase">
                FINANCE AND ACCOUNTING
              </div>
              <div style={{ fontSize: "2rem" }} className="font-bold">
                Financial Reporting Mastery
              </div>
              <p className="sub-header text-ellipsis">
                Get in the world of cooking with our beginner friendly basics of
                cooking 101. Join the class...
              </p>
              <button className="button primary-button text-uppercase">
                Register Now
              </button>
            </Flex>
          </Flex>
        </div>
      </>
    );
  };

  return (
    <div className="grid-card-container">
      {courses.map((course, index) => (
        <div className={`course-card small-card explore-card`} key={index}>
          <Image
            width={"100%"}
            src={course}
            fallback="/images/courses/pexels-pavel-danilyuk-8438918 1.png"
            preview={false}
          />
          {getCardContent()}
        </div>
      ))}
    </div>
  );
}
