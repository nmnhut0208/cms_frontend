const services: API.Service[] = [
  {
    fullName: 'Change hair',
    name: 'change_hair',
    description: 'Change hair to different styles',
    ai_type: 'txt2img',
    items: [],
    subcategories: 'Realistic, Chibi',
  },
  {
    fullName: 'Change outfit',
    name: 'change_outfit',
    description: 'Change oufit to different styles',
    ai_type: 'img2img',
    items: [],
    subcategories: 'Realistic, Chibi',
  },
];

export default {
  'GET /api/v1/services': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: services },
      errorCode: 0,
    });
  },
  'GET /api/v1/service/:id': (req: any, res: any) => {
    res.json({
      success: true,
      data: services.find((service) => service.name === req?.params?.id),
      errorCode: 0,
    });
  },
  'POST /api/v1/service': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'PUT /api/v1/service/:id': (req: any, res: any) => {
    console.log(req);
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'DELETE /api/v1/service/:id': (req: any, res: any) => {
    delete services[
      services.findIndex((service) => service.name === req?.params?.id)
    ];
    res.json({
      success: true,
      data: services,
      errorCode: 0,
    });
  },
};
