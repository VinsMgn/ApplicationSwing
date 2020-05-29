package com.epsi.mspr;
import java.awt.EventQueue;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.UIManager;
import javax.swing.plaf.nimbus.*;

public class WindowListenerBis {

	private JFrame frame;
	private JButton btnPush = new JButton("Push me");
	private JButton btnClick = new JButton("Click me");
	

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					WindowListenerBis window = new WindowListenerBis();
					window.frame.setDefaultCloseOperation(JFrame.DO_NOTHING_ON_CLOSE);
					UIManager.setLookAndFeel(new NimbusLookAndFeel());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	/**
	 * Create the application.
	 */
	public WindowListenerBis() {
		initialize();
	}
	

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setSize(600,400);
		frame.setTitle("Client Recycl");
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		
		
		JPanel contentPane = (JPanel)frame.getContentPane();
		contentPane.setLayout(new FlowLayout());
		/*
		 * btnPush.addActionListener( new ActionListener() {
		 * 
		 * public void actionPerformed(ActionEvent e) { btnPushListener(e); } });
		 */
		
		btnPush.addActionListener((e) -> btnPushListener(e));
		contentPane.add(btnPush);

		btnClick.addActionListener((e) -> System.out.println("BtnClick") );
		contentPane.add(btnClick);

		contentPane.add(new JCheckBox("Check me"));
		contentPane.add(new JTextField("Edit me"));
		
		frame.addWindowListener(new WindowAdapter() {
			@Override
			public void windowClosing(java.awt.event.WindowEvent e) {
				int clickedButton = JOptionPane.showConfirmDialog(contentPane, WindowListenerBis.this, "Etes vous sur de vouloir quitter ?", 0, 0);
				if (clickedButton == JOptionPane.YES_OPTION) {
					WindowListenerBis.this.frame.dispose();
				}
			
			}
		});
	}
	
	private void btnPushListener(ActionEvent e) {
		// btnClick.setText("toto");
		System.out.println("Push me");
	}

}
