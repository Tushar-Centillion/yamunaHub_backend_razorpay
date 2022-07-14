import {
	adminUserService,
	SectionSubService,
	AssayFinishedSubService,
} from '../../mongoServices';
import { Fields, AssayFinished_tabledata } from '../../models';
import { errorLogger } from '../../utils';
import { CONSTANTS } from '../../constants';
import { v1 as uuidv1 } from 'uuid';

const {
	STATUS_CODE: { SUCCESS, FAILED },
	RESPONSE_MESSAGE: { FAILEDRESPONSE, ADMINUSER, ASSAYFINISHED_TABLEDATA },
} = CONSTANTS;

const get = async (req, res) => {
	try {
		let appCount = await AssayFinishedSubService.get();
		if (appCount.length >= 1) {
			var mainData = [];
			appCount.map((element) => {
				var id = element._id;
				if (element.ObjectValue) {
					element.ObjectValue[0].sectionId = id;
				}
				mainData.push(element);
			});
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.GETSUCCESS,
				data: mainData,
			});
		} else {
			throw new Error(ASSAYFINISHED_TABLEDATA.GETFAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForThirdTbl = async (req, res, next) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: 'Std 1',
						id2: '',
						id3: 'Sample 1',
						id4: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 2',
						id2: '',
						id3: 'Sample 2',
						id4: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 3',
						id2: '',
						id3: '',
						id4: '',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 4',
						id2: '',
						id3: '',
						id4: '',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 5',
						id2: '',
						id3: '',
						id4: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Bracking Std',
						id2: '',
						id3: '',
						id4: '',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Mean',
						id2: '',
						id3: '',
						id4: '',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SD',
						id2: '',
						id3: '',
						id4: '',
						index: 7,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'RSD',
						id2: '',
						id3: '',
						id4: '',
						index: 8,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Mean (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 9,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SD (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 10,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'RSD (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 11,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForThirdTblStdDynamic = async (req, res, next) => {
	try {
		var table3Data;
		if (req.body.stdVal === 3) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'Sample 1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 2',
							id2: '',
							id3: 'Sample 2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 3',
							id2: '',
							id3: '',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},

				{
					ObjectValue: [
						{
							id1: 'Mean',
							id2: '',
							id3: '',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							id3: '',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							id3: '',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else if (req.body.stdVal === 2) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'Sample 1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 2',
							id2: '',
							id3: '',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean',
							id2: '',
							id3: '',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							id3: '',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							id3: '',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else if (req.body.stdVal === 1) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'Sample 1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else if (req.body.stdVal === 4) {
			//for Assay_Raw_with_WaterThreeStd
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'Sample 1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 2',
							id2: '',
							id3: 'Sample 2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 3',
							id2: '',
							id3: '',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Bracking Std',
							id2: '',
							id3: '',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean',
							id2: '',
							id3: '',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							id3: '',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							id3: '',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForFourTbl = async (req, res, next) => {
	try {
		var table3Data;
		if (req.body.StdId === 3) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: '',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: '',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForFourTblUOC = async (req, res, next) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 7,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 8,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						index: 9,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'avg',
						id2: '',
						index: 10,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Min',
						id2: '',
						index: 11,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Max',
						id2: '',
						index: 12,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForFourAssay_Raw_with_WaterData = async (req, res, next) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						id3: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						id3: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForThirdTbl_DOZ = async (req, res, next) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: 'Diameter of Zone (mm)',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SH + SL',
						id2: '',
						id3: 'TH + TL',
						id4: '',
						id5: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SH - SL',
						id2: '',
						id3: 'TH - TL',
						id4: '',
						id5: '',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '(SH + SL) - (TH + TL)',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '(SH - SL)+(TH - TL)',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'a',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Antilog 2+(a log I)',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'log I=log2',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 7,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Percentage of Potency % P',
						id2: '',
						id3: '%',
						id4: '',
						id5: '',
						index: 8,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Sample Name',
						id2: '',
						id3: '',
						id4: '',
						id5: '',
						index: 9,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '% Assay',
						id2: '',
						id3: '%',
						id4: '',
						id5: '',
						index: 10,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Content',
						id2: '',
						id3: 'mcg/mg',
						id4: '',
						id5: '',
						index: 11,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			return res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			throw new Error(FAILEDRESPONSE);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		return res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForContent = async (req, res, next) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: 'Std 1',
						id2: '',
						id3: 'Sample 1',
						id4: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 2',
						id2: '',
						id3: 'Sample 2',
						id4: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 3',
						id2: '',
						id3: 'Sample 3',
						id4: '',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 4',
						id2: '',
						id3: 'Sample 4',
						id4: '',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Std 5',
						id2: '',
						id3: 'Sample 5',
						id4: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Bracking Std',
						id2: '',
						id3: 'Sample 6',
						id4: '',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Mean',
						id2: '',
						id3: 'Sample 7',
						id4: '',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SD',
						id2: '',
						id3: 'Sample 8',
						id4: '',
						index: 7,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'RSD',
						id2: '',
						id3: 'Sample 9',
						id4: '',
						index: 8,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						id2: '',
						id3: 'Sample 10',
						id4: '',
						index: 9,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'Mean (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 10,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'SD (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 11,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'RSD (With BKT Std)',
						id2: '',
						id3: '',
						id4: '',
						index: 12,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForDissolution = async (req, res, next) => {
	try {
		var table3Data;
		if (req.body.StdVal === 12) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else if (req.body.StdVal === 51) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 2',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 3',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 4',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 5',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Bracking Std',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean',
							id2: '',
							id3: '',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							id3: '',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							id3: '',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD (With BKT Std)',
							id2: '',
							id3: '',
							id4: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else if (req.body.StdVal === 11) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}else if(req.body.StdVal == 22){
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Std 1',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 2',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 3',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 4',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Std 5',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Bracking Std',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean',
							id2: '',
							id3: 'D-1',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							id3: 'D-2',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							id3: 'D-3',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Mean (With BKT Std)',
							id2: '',
							id3: 'D-4',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD (With BKT Std)',
							id2: '',
							id3: 'D-5',
							id4: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD (With BKT Std)',
							id2: '',
							id3: 'D-6',
							id4: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addMonyForNet_content_of_vial = async (req, res, next) => {
	try {
		var table3Data;
		if (req.body.valNo === 10) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: '1',
							id2: '',
							id3: '',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '2',
							id2: '',
							id3: '',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '3',
							id2: '',
							id3: '',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '4',
							id2: '',
							id3: '',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '5',
							id2: '',
							id3: '',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '6',
							id2: '',
							id3: '',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '7',
							id2: '',
							id3: '',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '8',
							id2: '',
							id3: '',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '9',
							id2: '',
							id3: '',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '10',
							id2: '',
							id3: '',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Avg',
							id2: '',
							id3: '',
							id4: '',
							index: 20,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Min',
							id2: '',
							id3: '',
							id4: '',
							index: 21,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Max',
							id2: '',
							id3: '',
							id4: '',
							index: 22,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: '1',
							id2: '',
							id3: '',
							id4: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '2',
							id2: '',
							id3: '',
							id4: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '3',
							id2: '',
							id3: '',
							id4: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '4',
							id2: '',
							id3: '',
							id4: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '5',
							id2: '',
							id3: '',
							id4: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '6',
							id2: '',
							id3: '',
							id4: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '7',
							id2: '',
							id3: '',
							id4: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '8',
							id2: '',
							id3: '',
							id4: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '9',
							id2: '',
							id3: '',
							id4: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '10',
							id2: '',
							id3: '',
							id4: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '11',
							id2: '',
							id3: '',
							id4: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '12',
							id2: '',
							id3: '',
							id4: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '13',
							id2: '',
							id3: '',
							id4: '',
							index: 12,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '14',
							id2: '',
							id3: '',
							id4: '',
							index: 13,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '15',
							id2: '',
							id3: '',
							id4: '',
							index: 14,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '16',
							id2: '',
							id3: '',
							id4: '',
							index: 15,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '17',
							id2: '',
							id3: '',
							id4: '',
							index: 16,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '18',
							id2: '',
							id3: '',
							id4: '',
							index: 17,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '19',
							id2: '',
							id3: '',
							id4: '',
							index: 18,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '20',
							id2: '',
							id3: '',
							id4: '',
							index: 19,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Avg',
							id2: '',
							id3: '',
							id4: '',
							index: 20,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Min',
							id2: '',
							id3: '',
							id4: '',
							index: 21,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Max',
							id2: '',
							id3: '',
							id4: '',
							index: 22,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const assaytbladd = async (req, res) => {
	try {
		var table3Data;
		if (req.body.stdWithout === true) {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: 'Drug Result mg',
							id2: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Uniformity of weight',
							id2: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Average',
							id2: '',
							index: 12,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							index: 13,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							index: 14,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		} else {
			table3Data = [
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 0,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 1,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 2,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 3,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 4,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 5,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 6,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 7,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 8,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: '',
							id2: '',
							index: 9,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'Average',
							id2: '',
							index: 10,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'SD',
							id2: '',
							index: 11,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
				{
					ObjectValue: [
						{
							id1: 'RSD',
							id2: '',
							index: 12,
							id: uuidv1(),
						},
					],
					createdBy: req.body.userid,
					formId: req.body.formId,
					sectionId: req.body.sectionId,
				},
			];
		}

		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const multUpdateForThirdTbl = async (req, res, next) => {
	try {
		var data = req.body;
		for (var i = 0; i < data.length; i++) {
			var updateData = await AssayFinishedSubService.FindByIdAndUpdate(
				data[i].id,
				data[i],
			);
		}

		if (updateData) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.UPDATESUCCESS,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addManyWater = async (req, res) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: 'B.R',
						id2: '',
						id3: 'ml',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'factor',
						id2: '',
						id3: 'mg',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'wt. of sub',
						id2: '',
						id3: 'mg',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '%water',
						id2: '',
						id3: '%',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '100-%water',
						id2: '',
						id3: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addManyLossonDrying = async (req, res) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: 'Weight of Petriplate',
						id2: '',
						id3: 'gm',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'wt of substance',
						id2: '',
						id3: 'gm',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'wt of emptypd + sub',
						id2: '',
						id3: 'gm',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'after drying sub+pd',
						id2: '',
						id3: 'gm',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: 'change wt',
						id2: '',
						id3: 'gm',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '% LOD',
						id2: '',
						id3: '%',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '100-%LOD',
						id2: '',
						id3: '%',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const post = async (req, res) => {
	try {
		const id = req.body.userid;
		const checkExistingUser = await adminUserService.findAllQuery({
			_id: id,
		});
		if (!checkExistingUser) {
			throw new Error(ADMINUSER.NOTADMINUSER);
		}
		if (req.body.ObjectField) {
			const finddata = await Fields.find({
				_id: {
					$in: req.body.ObjectField,
				},
			});
			if (finddata) {
				req.body.createdBy = id;
				if (req.body.ObjectValue) {
					var data = req.body.ObjectValue[0];
					data.id = uuidv1();
					req.body.ObjectValue[0] = data;
				}
				var data = {
					...req.body,
				};
				const DataSave = new AssayFinished_tabledata(data);
				const saveResponse = await DataSave.save();
				if (saveResponse) {
					res.status(SUCCESS).json({
						success: true,
						msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
						data: saveResponse,
					});
				}
			}
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};

const getByid = async (req, res) => {
	try {
		const { id } = req.params;
		var mainData = [];
		const data = await SectionSubService.FindById(id);
		mainData.push(data);
		const finddata = await Fields.find(
			{
				_id: {
					$in: data.fieldId,
				},
			},
			{ _id: 1, fieldName: 1, bgColor: 1, title: 1, variant: 1 },
		);
		var test = { SectionData: [...mainData], FieldData: finddata };
		if (!mainData) {
			res.status(FAILED).json({
				success: false,
				msg: ASSAYFINISHED_TABLEDATA.GETFAILED,
			});
		} else {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.GETSUCCESS,
				data: test,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const deleteData = async (req, res) => {
	try {
		const { id } = req.query;

		const data = await AssayFinishedSubService.deleteOneQuery(
			id,
			req.query.userid,
		);
		if (data) {
			res.status(SUCCESS).send({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.DELETESUCCESS,
				data: [],
			});
		} else {
			throw new Error(ASSAYFINISHED_TABLEDATA.DELETEFAILED);
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const updateData = async (req, res) => {
	try {
		const { id } = req.body;

		const data = await AssayFinishedSubService.FindById({ _id: id });
		if (!data) {
			res.status(FAILED).json({
				success: false,
				msg: ASSAYFINISHED_TABLEDATA.UPDATEFAILED,
			});
		} else {
			const updateData = await AssayFinishedSubService.FindByIdAndUpdate(
				id,
				req.body,
			);
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.UPDATESUCCESS,
				data: updateData,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
const addtblDissolution = async (req, res) => {
	try {
		var table3Data = [
			{
				ObjectValue: [
					{
						id1: '',
						index: 0,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 1,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 2,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 3,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 4,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 5,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 6,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 7,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
			{
				ObjectValue: [
					{
						id1: '',
						index: 8,
						id: uuidv1(),
					},
				],
				createdBy: req.body.userid,
				formId: req.body.formId,
				sectionId: req.body.sectionId,
			},
		];
		const saveResponse = await AssayFinished_tabledata.insertMany(table3Data);

		if (saveResponse) {
			res.status(SUCCESS).json({
				success: true,
				msg: ASSAYFINISHED_TABLEDATA.CREATESUCCESS,
				data: table3Data,
			});
		} else {
			res.status(FAILED).json({
				success: false,
				error: error.message || FAILEDRESPONSE,
			});
		}
	} catch (error) {
		errorLogger(error.message, req.originalUrl, req.ip);
		res.status(FAILED).json({
			success: false,
			error: error.message || FAILEDRESPONSE,
		});
	}
};
export default {
	get,
	post,
	getByid,
	deleteData,
	updateData,
	addMonyForThirdTbl,
	addMonyForThirdTblStdDynamic,
	multUpdateForThirdTbl,
	assaytbladd,
	addManyWater,
	addMonyForContent,
	addManyLossonDrying,
	addMonyForThirdTbl_DOZ,
	addMonyForDissolution,
	addMonyForNet_content_of_vial,
	addMonyForFourTbl,
	addMonyForFourAssay_Raw_with_WaterData,
	addMonyForFourTblUOC,
	addtblDissolution,
};
