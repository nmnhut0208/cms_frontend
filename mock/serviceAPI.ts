const services: API.Service[] = [
  {
    id: 0,
    name: 'Change hair',
    code: 'change_hair',
    description: 'Change hair to different styles',
    type: 'txt2img',
  },
  {
    id: 1,
    name: 'Change outfit',
    code: 'change_outfit',
    description: 'Change oufit to different styles',
    type: 'img2img',
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
      data: services.find((service) => service.id === req?.params?.id),
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
      services.findIndex((service) => service.id === req?.params?.id)
    ];
    res.json({
      success: true,
      data: services,
      errorCode: 0,
    });
  },
};
