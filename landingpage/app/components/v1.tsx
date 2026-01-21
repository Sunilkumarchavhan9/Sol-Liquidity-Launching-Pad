

export default function  V1(){

    return(
      <div className="flex sticky items-center md:-mt-[200px] lg:bottom-auto lg:mt-[106px]" style={{ width: '1346px', height: '210px' }}>
        <video width="320" height="240" autoPlay loop muted    playsInline style={{ width: '434px', height: '310px', objectFit: 'cover' }}>
          <source src="/mp.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )
}