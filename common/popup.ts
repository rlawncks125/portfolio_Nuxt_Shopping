export function windowFeatures() {
  const width = 300;
  const height = 300;
  // 포지션 center로 맞춘 값
  const left = (window.innerWidth - width) / 2 + window.screenX;
  const top = (window.innerHeight - height) / 2 + window.screenY;

  return `popup=true,width=${width},height=${height},left=${left},top=${top}`;
}
