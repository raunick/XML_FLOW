import React, { useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface ImageNodeProps {
  src?: string; // Tornar src opcional
  isConnectable: boolean;
}

const ImageNode: React.FC<ImageNodeProps & NodeProps> = ({ src, isConnectable }) => {
  const [imageSrc, setImageSrc] = useState<string>(src || '');

  // Verificar se src é inválido e definir uma imagem padrão
  if (!imageSrc) {
    setImageSrc(
      'https://lh3.googleusercontent.com/fife/ALs6j_Fhs33soYFMeIYkw9EATCrkkIPTcVXbeuM12F8UpD-Ecj8gH0YLaGK7lSR-BGpVgRQ33imseT7mW_Kei0cZ_JmEpa3sALpsuKOMMuhetQG0dXjujXPKNM3mVhG_kBGnP_lBW9ms9MB8Wjh9HRaWrOa-Ye__kvs1hXJDZYsycXebs3ajBPmq0CVoRLlBGyEbVo3Dk5ucGqbQ42ugXoDmXUxnkuxwHfQQDhtTFaA6jtItYe-tNPtVnc5XdeA88yaADJmrJim4vx_ySvOs1K7wgIXHXKMPlZtiL0v8CYeOruu0OYhVWnicrUU5TBo8HwBBCnqlaNpTsAw54jnksOEt4o73vMoUQaAtgTV9EakCsT492P3_gxBXqu4xDlsDCWf3Bluj0OiDqEpInV44Q7g475OViwNRNMQasVjcO18qQfCtt4OMmYdb80NDPDw4uIu1tP4JUuvKpebK6W0_Ts0CoUXQx9EaxYRYnNtTrOdnGVslgJmTiPmGeRkHKLwmIWjRQs_v2o4dr27TEqzzvi0ZbrzClYaP0O5jdx2vm2JNGhtS8Sj3nCWc33iIb2C8HQUsAijqQuVFWXWeR2fd78smBGeB3sNu4I0hm4PaMC7Q51leAxGTMMCNbhrgUkrfmGzTHI9P9wbOoVMVgI2QVNK3iPKdvqeowK3VLprDV2ofv7RnUg7wnjodJQE8-d7M-w63oglX42op1gOFBYsFhnTWGV4A2jLhQP8uzETkQlzttra1JqF2Jp7fxCNWmBFTea9BsyRkAcprrpxon79ywJddo9eTPYZ25bykN5X_8E_61H7DrNxkvX19J8wt-Ib7IlHzrXtUp2H60v6C3Ko_umE2LjAxTZ8szoCvT15ddV9pkgFanPEoR1HFujK9F7vSp0BL0DYnADyYeVU-S3CgzPpMjNM4FIEH0Rzx-kfBiCocydvPcBly3wTEnfB7vEZBx0rQopRxY98_ZdRCJFA579_8_rAqoR1hfOO8PhgttHrre0e-kKtEGj82931eYHrglkdHONLJ8S335A15_XDaEUnIISRUGEQ6y5nKlb-AuhlGpM5wR7wJJvyWNydJ3RcmRCtLaW1Gk_abw4EmoLLsVqJ0rduFg9AI5ByqGn0WPYXYP7iDHyQTwsCREE6l3oYO-xQTnRleSdzISwHpEQpFv1_MvysIs7dQmLwWsQ_Xe8OsO5KV4k0rKXSBaTXu-JMmgBHIWe5qkyqwt6POj2GNguZVU6UsyeE1NPGeAJ2szPWVezhD5kOK8NTAoGPr6B6EMQi5ZsyrgksqqS81-NVMpt4LxU3wcGZyJvPQuYPWtHJp5UBESSiXK0XvWFl6xb6EkLyna5OB3c9sloDoENsdbhC_YCyWblxJSNAWCXJ2cEsg34eI8WFp2-6nnDY6G95LBNsG_HeLZV3UFjfKIZMSh_I9cNp3liqVIaXgP2VD3xWcNYqTQ4xXeYTEQmKbmKndMXbHek0mX9Z5Z9wNxjCgMGn3lA2UvSKoFHNgRQBzAFIoAx5NuLVW_bc-q98aZhmspwhTRVmpVLZjspuSSVU7tdiOflyPigpB9XPz4Lm8wB5r4An5jimPXon1n601ob0PB4sg0fdq8BWGDg=w1920-h945'
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-auto p-4 bg-white shadow-md rounded-lg border border-gray-300">
      <Handle
        type="target"
        position={Position.Left}
        id="l3"
        isConnectable={isConnectable}
        className="w-2 h-2 bg-green-500 rounded-full shadow-md cursor-pointer ml-2 -mt-8"
      />
      <h2 className="text-2xl font-semibold mb-4">Visuarlizador</h2>
      <div>
        <img
          src={imageSrc}
          alt="Image"
          className=""
        />
      </div>
    </div>
  );
};

export default ImageNode;
